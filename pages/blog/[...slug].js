import Head from 'next/head'
import Link from 'next/link'

import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'

export default function Post({ slug, frontmatter, markdownbody }) {
    // If we do not pass frontmatter as string rater than object itself,
    // serialization error will occure. So to pass frontmatter object,
    // We have to stringify the object then parse it on client side.
    frontmatter = JSON.parse(frontmatter)

    return (
        <div>
            <Head>
                <title>{frontmatter.title || 'untitled'}</title>
            </Head>

            <div className="top">
                <div className="header">
                    <div className="date">
                        {frontmatter.date || ''}
                    </div>
                    <div className="title">
                        <Link href="/blog/[...slug]" as={`/blog/${slug.join('/')}`}>
                            <a>{frontmatter.title || 'untitled'}</a>
                        </Link>
                    </div>
                    <div className="subtitle">
                        {frontmatter.subtitle || ''}
                    </div>
                    <div className="tags">
                        {frontmatter.tags && frontmatter.tags.map(tag => {
                            return (
                                <span key={tag} className="tag">
                                    #{tag}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="content-wrapper">
                <div className="content">
                    <ReactMarkdown
                        source={markdownbody}
                        renderers={{ code: function({ language, value }) {
                            return (
                               <SyntaxHighlighter language={language}>
                                   {value}
                               </SyntaxHighlighter> 
                            )
                        } }}/>
                </div>
            </div>

            <style jsx>{`
            .top {
                margin: 0;
                background-color: #ff6565;
                box-shadow: 0 0 5pt black;
            
                color: white;
            }
            .header {
                width: 600pt;
                padding: 40pt 0;
                margin: 0 auto;
            }
            .header .title {
                font-size: 48pt;
                font-weight: bold;
            }
            .header .subtitle {
                font-weight: bold;
            }
            .tag {
                margin-right: 4pt;
                padding: 2pt 4pt;
                font-size: 9pt;
                border-radius: 3pt;
                background-color: #0000007a;
            }
            .content-wrapper {
                margin: 40pt 0;
            }
          
            .content {
                width: 600pt;
                margin: 0 auto;
            }
            `}</style>

            <style jsx global>{`
            @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css); font-family: 'Noto Sans KR', sans-serif;

            html, body {
                margin: 0;
                padding: 0;
  
                font-family: 'Noto Sans KR', sans-serif;
            }

            a {
                color: inherit;
                text-decoration: none;
            }

            * {
                box-sizing: border-box;
            }
            `}</style>
        </div>
    )
}

export async function getStaticProps(context) {
    const { slug } = context.params

    const content = await import(`../../posts/${slug.join('/')}.md`)
    const data = matter(content.default)

    return {
        props: {
            slug: slug || [],
            frontmatter: JSON.stringify(data.data),
            markdownbody: data.content
        }
    }
}

// This function is also called on serer-side.
export async function getStaticPaths() {
    var glob = require('glob')
    const posts = glob.sync('posts/**/*.md') // '**' is globstar.
    const postSlugs = posts.map(file => {
        return file
            .replace(/ /g, '-') // Replace all blanks into dash.
            .split('/')
            .slice(1) // Drop first directory path 'posts'.
            .join('/')
            .slice(0, -3) // Drop last three letter, '.md'.
            .trim()
    })
    const paths = postSlugs.map(slug => `/blog/${slug}`)

    return {
        paths,
        fallback: false
    }
}