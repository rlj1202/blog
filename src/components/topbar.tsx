import type { NextPage } from 'next'
import Link from 'next/link'

import Config from '../config'

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
            {Config.menus.map(menu => (
              <span className="topbar-link" key={menu.label}>
                <Link href={menu.path}><a>{menu.label}</a></Link>
              </span>
            ))}
          </div>
        </div>
        <div className="topbar-right">
          {/* Ready for dark-mode
          <span className="topbar-link">
            <i className="fas fa-moon"></i>
          </span>
          <span className="topbar-link">
            <i className="fas fa-sun"></i>
          </span>
          */}
        </div>

        <style jsx>{`
          .topbar {
            font-family: 'Consolas', 'Ubuntu Mono', monospace;
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
