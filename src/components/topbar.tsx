import Link from 'next/link'
import Image from 'next/image'

import Config from '../config'

import logo from '../../public/favicon.svg'

const Topbar: React.FC = () => {
  // TODO
  var darkMode = false

  return (
    <div className="topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <Link href="/">
            <a>
              <div className="topbar-title">
                <div className="topbar-logo">
                  <Image src={logo} width={'25'} height={'25'} layout="fixed" />
                </div>
                {Config.title}
              </div>
            </a>
          </Link>
          <div className="topbar-left-links">
            {Config.menus.map(menu => (
              <span className="topbar-link" key={menu.label}>
                <Link href={menu.path}><a>{menu.label}</a></Link>
              </span>
            ))}
          </div>
        </div>
        <div className="topbar-right">
          <button
            className="theme-button topbar-link"
            onClick={() => {  }}>
            {darkMode ? (
              <i className="fas fa-sun fa-lg"></i>
            ) : (
              <i className="fas fa-moon fa-lg"></i>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .topbar {
          color: #333333;
          box-shadow: rgba(0, 0, 0, 0.05) 0 0 20px 5px;
          overflow-x: auto;
        }
        .topbar-content {
          max-width: 800px;
          margin: 0 auto;
          box-sizing: content-box;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .topbar-left {
          display: flex;
          align-items: center;
        }
        .topbar-left-links {
          display: flex;
          column-gap: 2rem;
          padding: 0 2rem;
        }
        .topbar-right {
          display: flex;
          align-items: center;
        }
        .topbar-link {
          font-weight: 400;
        }
        .topbar-title {
          padding: 1.7rem 0;
          font-weight: 600;
          font-size: 1.2em;
          line-height: 100%;

          display: flex;
          align-items: center;
          column-gap: 0.5em;
        }
        .topbar-logo {
          padding: 0 5px;
          display: inline-flex;
        }
        .theme-button {
          display: block;
          border: none;
          background: none;
          padding: 1em;
        }
      `}</style>
    </div>
  )
}

export default Topbar
