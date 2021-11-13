import Config from "../config"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="links">
        <span>
          <i className="fab fa-github-square"></i>
          <a href={Config.author.contacts.github}>Github</a>
        </span>
        <span>
          <i className="fab fa-twitter-square"></i>
          <a href={Config.author.contacts.twitter}>Twitter</a>
        </span>
        <span>
          <i className="fas fa-envelope"></i>
          <a href={`mailto:${Config.author.contacts.email}`}>{Config.author.contacts.email}</a>
        </span>
      </div>
      <div className="links">
        <span>
          <i className="fas fa-rss"></i>
          <a href={Config.rss.rss2Path}>RSS 2.0</a>
        </span>
        <span>
          <i className="fas fa-rss"></i>
          <a href={Config.rss.atom1Path}>ATOM 1.0</a>
        </span>
        <span>
          <i className="fas fa-rss"></i>
          <a href={Config.rss.json1Path}>JSON 1.0</a>
        </span>
      </div>
      <div>
        {Config.copyright}
      </div>

      <style jsx>{`
        .footer {
          font-family: 'Consolas', 'Ubuntu Mono', monospace;
          margin: 40px 0;
          text-align: center;
          color: #999999;
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          row-gap: 1.5rem;
        }
        .links {
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 1rem;
          row-gap: 1rem;
          flex-wrap: wrap;
        }
        .links span i {
          margin-right: 0.5rem;
        }
      `}</style>
    </footer>
  )
}

export default Footer
