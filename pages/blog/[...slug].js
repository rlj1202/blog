import Head from 'next/head'
import Link from 'next/link'

import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'

import Layout from '../../components/Layout'

export default function Post({ slug, frontmatter, markdownbody }) {
    // If we do not pass frontmatter as string rater than object itself,
    // serialization error will occure. So to pass frontmatter object,
    // We have to stringify the object then parse it on client side.
    frontmatter = JSON.parse(frontmatter)

    if (!Array.isArray(frontmatter.tags)) {
        frontmatter.tags = [frontmatter.tags]
    }

    return (
        <Layout>
            <Head>
                <title>{frontmatter.title || 'untitled'}</title>
            </Head>

            <div className="top">
                <div className="header fixed-width">
                    <div className="navigator">
                        <span className="navigator-link">
                            <Link href="/" as={`${process.env.baseUrl}/`}>
                                <a>home</a>
                            </Link>
                        </span>
                        <span className="right-arrow">&gt;</span>
                        <span className="navigator-link">
                            blog
                        </span>
                    </div>
                    <div className="date">
                        {frontmatter.date || ''}
                    </div>
                    <div className="title">
                        <Link href="/blog/[...slug]" as={`${process.env.baseUrl}/blog/${slug.join('/')}`}>
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
                <div className="content fixed-width">
                    <ReactMarkdown
                        source={markdownbody}
                        escapeHtml={false}
                        renderers={{ code: function({ language, value }) {
                            return (
                               <SyntaxHighlighter language={language}>
                                   {value}
                               </SyntaxHighlighter> 
                            )
                        } }}/>
                    
                    <hr/>

                    <div className="prev-post">
                        <h2 className="heading">이전글</h2>
                        <span className="title">"The test title"</span>
                    </div>

                    <div className="next-post">
                        <h2 className="heading">다음글</h2>
                        <span className="title">"Another post title"</span>
                    </div>

                    <hr/>

                    <footer className="footer">
                        Github.io - Copyright(c) 2020. Jisu Sim(RedLaboratory)
                    </footer>
                </div>
            </div>

            <style jsx>{`
            .top {
                margin: 0;
                background-color: #ff6565;
                box-shadow: 0 0 5pt black;
            
                color: white;
            }
            .fixed-width {
                max-width: 600pt;
                min-width: 0;
                padding: 0 20pt;
                margin: 0 auto;
            }
            .header {
                padding-top: 20pt;
                padding-bottom: 20pt;
            }
            .header .navigator {
                margin-bottom: 20pt;
                font-family: monospace;
            }
            .header .navigator .right-arrow {
                font-weight: bold;
                padding: 0 2pt;
            }
            .header .navigator-link {
                font-size: 8pt;
                color: black;
                background-color: white;
                border-radius: 16pt;
                padding: 2pt 6pt;
            }
            .header .date {
                margin: 10pt 0;
            }
            .header .title {
                font-size: 35pt;
                font-weight: bold;

                margin: 10pt 0;
            }
            .header .subtitle {
                font-weight: bold;

                margin: 10pt 0;
            }
            .tags {
                margin-top: 10pt;
            }
            .tag {
                margin-right: 4pt;
                padding: 2pt 4pt;
                font-size: 9pt;
                border-radius: 3pt;
                background-color: #0000007a;

                display: inline-block;
            }
            .content-wrapper {
                margin: 20pt 0;
            }
            hr {
                border: 0;
                height: 1px;
                background-color: #00000014;

                margin: 20pt 0;
            }
            .prev-post .heading, .next-post .heading {
                margin-bottom: 5pt;
            }
            .prev-post .title, .next-post .title {
                font-style: italic;
                color: #7d7d7d;
            }
            .next-post {
                text-align: right;
            }
            .footer {
                text-align: center;
                font-size: 9pt;

                margin: 20pt 0;
            }
            `}</style>

            <style jsx global>{`
            code {
                background-color: #dddddd;
                font-size: inherit;
                padding: 2pt 4pt;
                border-radius: 2pt;
            }

            .content img, .content iframe {
                max-width: 100%;
            }
            `}</style>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const { slug } = context.params

    const content = await import(`../../posts/${slug.join('/')}.md`)
    const data = matter(content.default, {
        excerpt_separator: '<!-- more -->'
    })

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