import type { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/layout'

import Config from '../config'

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{`About - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>About</h1>

        <p>
          me
        </p>
      </div>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default About
