import Head from 'next/head'
import Link from 'next/link'
import matter from 'gray-matter'

export default function Home({ posts }) {
  posts = posts.map(post => {
    return {
      slug: post.slug,
      frontmatter: JSON.parse(post.frontmatter),
      markdownbody: post.markdownbody
    }
  })

  return (
    <div>
      <Head>
        <title>RedLaboratory</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>

      <div className="top">
        <div className="header">
          <div className="date">2020-06-07</div>
          <div className="title">
            Untitled
          </div>
          <div className="subtitle">
            subtitle
          </div>
          <div className="tags">
          </div>
        </div>
      </div>

      <main className="content-wrapper">
        <div className="content">
          <h1>Title</h1>
          <p>Test</p>
          <h2>Title</h2>
          <p>Test</p>
          { posts.map(post => {
              return (
                <div key={post.slug}>
                  <Link href='/blog/[...slug]' as={`/blog/${post.slug.join('/')}`}>
                    <a>
                      { post.slug.join('/') }
                      { post.frontmatter.title || 'untitled' }
                    </a>
                  </Link>
                </div>
              )
          }) }
        </div>
      </main>

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
        font-size: 50pt;
        font-weight: bold;
      }
      .header .subtitle {
        font-weight: bold;
      }
      .tag {
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
      `}</style>
    </div>
  )
}

// This function is called on server-side at build time.
// Returned props will be used to pre-render the page.
export async function getStaticProps(context) {
  var postHelper = require('../helper/post-helper')
  console.log(postHelper.getPostSlugs())

  const posts = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      const slug = key
        .replace(/ /, '-')
        .slice(0, -3)
        .trim()
        .split('/')
        .slice(1)
      const value = values[index]
      const document = matter(value.default)

      return {
        frontmatter: JSON.stringify(document.data),
        markdownbody: document.content,
        slug
      }
    })
    
    return data
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts
    }
  }
}

// export default function Home() {
//   return (
//     <div className="container">
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1 className="title">
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className="description">
//           Get started by editing <code>pages/index.js</code>
//         </p>

//         <div className="grid">
//           <a href="https://nextjs.org/docs" className="card">
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className="card">
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className="card"
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className="card"
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
//         </a>
//       </footer>

//       <style jsx>{`
//         .container {
//           min-height: 100vh;
//           padding: 0 0.5rem;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }

//         main {
//           padding: 5rem 0;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }

//         footer {
//           width: 100%;
//           height: 100px;
//           border-top: 1px solid #eaeaea;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         footer img {
//           margin-left: 0.5rem;
//         }

//         footer a {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         a {
//           color: inherit;
//           text-decoration: none;
//         }

//         .title a {
//           color: #0070f3;
//           text-decoration: none;
//         }

//         .title a:hover,
//         .title a:focus,
//         .title a:active {
//           text-decoration: underline;
//         }

//         .title {
//           margin: 0;
//           line-height: 1.15;
//           font-size: 4rem;
//         }

//         .title,
//         .description {
//           text-align: center;
//         }

//         .description {
//           line-height: 1.5;
//           font-size: 1.5rem;
//         }

//         code {
//           background: #fafafa;
//           border-radius: 5px;
//           padding: 0.75rem;
//           font-size: 1.1rem;
//           font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
//             DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
//         }

//         .grid {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-wrap: wrap;

//           max-width: 800px;
//           margin-top: 3rem;
//         }

//         .card {
//           margin: 1rem;
//           flex-basis: 45%;
//           padding: 1.5rem;
//           text-align: left;
//           color: inherit;
//           text-decoration: none;
//           border: 1px solid #eaeaea;
//           border-radius: 10px;
//           transition: color 0.15s ease, border-color 0.15s ease;
//         }

//         .card:hover,
//         .card:focus,
//         .card:active {
//           color: #0070f3;
//           border-color: #0070f3;
//         }

//         .card h3 {
//           margin: 0 0 1rem 0;
//           font-size: 1.5rem;
//         }

//         .card p {
//           margin: 0;
//           font-size: 1.25rem;
//           line-height: 1.5;
//         }

//         .logo {
//           height: 1em;
//         }

//         @media (max-width: 600px) {
//           .grid {
//             width: 100%;
//             flex-direction: column;
//           }
//         }
//       `}</style>

//       <style jsx global>{`
//         html,
//         body {
//           padding: 0;
//           margin: 0;
//           font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
//             Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
//             sans-serif;
//         }

//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//     </div>
//   )
// }
