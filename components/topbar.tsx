import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import githubPic from '../public/assets/github.svg'
import twitterPic from '../public/assets/twitter.svg'

const Topbar: NextPage = () => {
    return (
      <div className="topbar">
        <div className="topbar-left">
          <div className="topbar-logo">
            <Link href="/">
              <a>rlj1202.github.io</a>
            </Link>
          </div>
          <div className="topbar-left-links">
            <span className="topbar-link">
              <Link href="/about"><a>About</a></Link>
            </span>
            <span className="topbar-link">
              <Link href="/tags"><a>Tags</a></Link>
            </span>
            <span className="topbar-link">
              <Link href="/categories"><a>Categories</a></Link>
            </span>
            <span className="topbar-link">
              <Link href="/archives"><a>Archives</a></Link>
            </span>
          </div>
        </div>
        <div className="topbar-right">
          <span className="topbar-link"><a href="https://github.com/rlj1202">
            <Image src={githubPic} alt="GitHub" width={20} height={20} layout="fixed" />
          </a></span>
          <span className="topbar-link"><a href="https://twitter.com/jisoosim">
            <Image src={twitterPic} alt="Twitter" width={20} height={20} layout="fixed" />
          </a></span>
        </div>

        <style jsx>{`
          .topbar {
            font-family: 'Consolas';
            font-size: 1em;
            box-shadow: rgba(0, 0, 0, 0.05) 0 4px 4px;

            display: flex;
            justify-content: space-between;
            padding: 0 40px;

            overflow-x: auto;
          }
          .topbar-left {
            display: flex;
            align-items: center;
          }
          .topbar-left-links {
            display: flex;
          }
          .topbar-right {
            display: flex;
            align-items: center;
          }
          .topbar-link {
            margin-left: 40px;
          }
          .topbar-logo {
            padding: 30px 20px;
            background-color: #FF4F4F;
            color: white;
            font-weight: bold;
          }
        `}</style>
      </div>
    )
}

export default Topbar
