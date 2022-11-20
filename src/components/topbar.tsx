import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Config from '@/config';

import logo from '@public/favicon.svg';
import ToggleTheme from '@/components/toggletheme';

const Topbar: React.FC = () => {
  const [navShow, setNavShow] = useState(false);

  const toggleNav = () => {
    setNavShow((status) => !status);
  };

  return (
    <div className="topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <Link href="/">
            <a>
              <div className="topbar-title">
                <div className="topbar-logo">
                  <Image
                    src={logo}
                    width={'25'}
                    height={'25'}
                    layout="fixed"
                    alt="Logo"
                  />
                </div>
                {Config.title}
              </div>
            </a>
          </Link>
          <div className="topbar-left-links">
            {Config.menus.map((menu) => (
              <span className="topbar-link" key={menu.label}>
                <Link href={menu.path}>
                  <a>{menu.label}</a>
                </Link>
              </span>
            ))}
          </div>
        </div>
        <div className="topbar-right">
          <button
            className="topbar-button topbar-button-more"
            onClick={toggleNav}
          >
            <i className="fas fa-bars fa-lg"></i>
          </button>
          <div className="topbar-button">
            <ToggleTheme />
          </div>
        </div>
      </div>
      <div className={`topbar-nav ${navShow ? 'show' : ''}`}>
        <div className="topbar-nav-links">
          {Config.menus.map((menu) => (
            <div key={menu.label}>
              <Link href={menu.path}>
                <a>{menu.label}</a>
              </Link>
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
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
        }
        .topbar-content,
        .topbar-nav {
          max-width: 50rem;
          margin: 0 auto;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
        }
        .topbar-nav {
          max-height: 0;
          transition: max-height 0.25s ease-out;
        }
        .topbar-nav-links {
          display: flex;
          flex-direction: column;
          row-gap: 1.25rem;
          padding-bottom: 1.25rem;
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
          max-height: ${Config.menus.length * 4}rem;
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
  );
};

export default Topbar;
