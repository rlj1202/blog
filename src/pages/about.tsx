import type { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/layout'

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>

      <div className="main">
        <h1>About</h1>

        me

        <hr />
      </div>

      <style jsx>{`
        .main {
          margin: 40px auto;
          max-width: 800px;
          box-sizing: content-box;
          padding: 0 40px;
        }
      `}</style>
    </Layout>
  )
}

export default About
