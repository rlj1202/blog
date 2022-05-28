import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Config from '@/config'

import logo from '../../public/favicon.svg'

const Topbar: React.FC = () => {
  var [ activeTheme, setTheme ] = useState('light')
  var [ navShow, setNavShow ] = useState(false)

  var toggleNav = () => {
    setNavShow(status => {

      return !status
    })
  }

  var toggleTheme = () => {
    setTheme(theme => {
      theme = theme == 'light' ? 'dark' : 'light'

      document.body.dataset.theme = theme

      return theme
    })
  }

  return (
    <div className="topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <Link href="/">
            <a>
              <div className="topbar-title">
                <div className="topbar-logo">
                  <Image src={logo} width={'25'} height={'25'} layout="fixed" alt="Logo" />
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
          <button className="topbar-button topbar-button-more" onClick={toggleNav}>
            <i className="fas fa-bars fa-lg"></i>
          </button>
          <button
            className="topbar-button"
            onClick={toggleTheme}>
            {activeTheme == 'light' ? (
              <i className="fas fa-moon fa-lg"></i>
            ) : (
              <i className="fas fa-sun fa-lg"></i>
            )}
          </button>
        </div>
      </div>
      <div className={`topbar-nav ${navShow ? 'show' : ''}`}>
        <div className="topbar-nav-links">
          {Config.menus.map(menu => (
            <div key={menu.label}>
              <Link href={menu.path}><a>{menu.label}</a></Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .topbar {
          box-shadow: rgba(0, 0, 0, 0.05) 0 0 20px 5px;
          overflow: hidden;
          background-color: var(--color-bg-secondary);
        }
        .topbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .topbar-content, .topbar-nav {
          max-width: 800px;
          margin: 0 auto;
          box-sizing: content-box;
          padding: 0 40px;
        }
        .topbar-nav {
          max-height: 0;
          transition: max-height 0.25s ease-out;
        }
        .topbar-nav-links {
          display: flex;
          flex-direction: column;
          row-gap: 20px;
          padding-bottom: 40px;
        }
        .topbar-left {
          display: flex;
          align-items: center;
        }
        .topbar-left-links {
          display: flex;
          column-gap: 2em;
          padding: 0 2em;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          column-gap: 2em;
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
          padding: 0;
          display: inline-flex;
        }
        .topbar-button {
          display: block;
          border: none;
          background: none;
          padding: 0;
        }
        .show {
          max-height: ${Config.menus.length * 4}em;
          transition: max-height 0.25s ease-in;
        }
        @media (min-width: 800px) {
          .topbar-button-more {
            display: none;
          }
          .topbar-nav {
            display: none;
          }
        }
        @media (max-width: 800px) {
          .topbar-left-links {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Topbar
