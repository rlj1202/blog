import Head from 'next/head'
import Link from 'next/link'

import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'

import DefaultLayout from '../../components/DefaultLayout'
import PostLink from '../../components/PostLink'

export default function Post({ slug, frontmatter, markdownBody, markdownExcerpt }) {
    // If we do not pass frontmatter as string rater than object itself,
    // serialization error will occure. So to pass frontmatter object,
    // We have to stringify the object then parse it on client side.
    frontmatter = JSON.parse(frontmatter)

    // For old post compatibility, make not-array tags value into array.
    if (!Array.isArray(frontmatter.tags)) {
        frontmatter.tags = [frontmatter.tags]
    }

    const header = (
        <>
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
                <PostLink slug={slug}>
                    <a>{frontmatter.title || 'untitled'}</a>
                </PostLink>
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

            <style jsx>{`
                .navigator {
                    margin-bottom: 20pt;
                    font-family: monospace;
                }
                .navigator .right-arrow {
                    font-weight: bold;
                    padding: 0 4pt;
                }
                .navigator-link {
                    font-size: 8pt;
                    color: black;
                    background-color: white;
                    border-radius: 16pt;
                    padding: 2pt 6pt;
                }
                .date {
                    margin: 10pt 0;
                }
                .title {
                    font-size: 35pt;
                    font-weight: bold;
    
                    margin: 10pt 0;
                }
                .subtitle {
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
            `}</style>
        </>
    )

    return (
        <DefaultLayout header={header}>
            <Head>
                <title>{frontmatter.title || 'untitled'}</title>
            </Head>

            <ReactMarkdown
                source={markdownBody}
                escapeHtml={false}
                renderers={{
                    code: function ({ language, value }) {
                        return (
                            <SyntaxHighlighter language={language}>
                                {value}
                            </SyntaxHighlighter>
                        )
                    }
                }} />

            <hr />

            <div className="prev-post">
                <h2 className="heading">이전글</h2>
                <span className="title">"The test title"</span>
            </div>

            <div className="next-post">
                <h2 className="heading">다음글</h2>
                <span className="title">"Another post title"</span>
            </div>

            <hr />

            <footer className="footer">
                Github.io - Copyright(c) 2020. Jisu Sim(RedLaboratory)
            </footer>

            <style jsx global>{`
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
        </DefaultLayout>
    )
}

// This function is called on server-side.
export async function getStaticProps(context) {
    const postHelper = require('../../helper/post-helper')

    const { slug } = context.params

    return {
        props: { ...postHelper.getPosts().get(slug.join('/')) }
    }
}

// This function is also called on serer-side.
export async function getStaticPaths() {
    const postHelper = require('../../helper/post-helper')

    const paths = Array.from(postHelper.getPosts().keys())
        .map(slug => `/blog/${slug}`)

    return {
        paths,
        fallback: false
    }
}