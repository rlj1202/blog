import Link from 'next/link'
import Config from '../config'

const Paginator: React.FC<{
  curPage?: number, perPage?: number, total?: number,
  pageUrl?: (page: number) => string
}> = ({ curPage = 1, perPage = Config.postsPerPage, total = 100, pageUrl = (page: number) => { return '/' } }) => {
  let maxPage = Math.ceil(total / perPage)

  return (
    <div className="pagination-wrapper">
      <div className="pagination">
        <div className="pagination-button">
          <Link href={pageUrl(Math.max(curPage - 1, 1))}><a>
            <i className="fas fa-chevron-left"></i>
          </a></Link>
        </div>
        {[...Array.from(Array(maxPage + 1).keys()).slice(1)].map(i => (
          <div key={i} className={`pagination-button ${i == curPage ? 'pagination-button-selected' : ''}`}>
            <Link href={pageUrl(i)}><a>{i}</a></Link>
          </div>
        ))}
        <div className="pagination-button">
          <Link href={pageUrl(Math.min(curPage + 1, maxPage))}><a>
            <i className="fas fa-chevron-right"></i>
          </a></Link>
        </div>
      </div>

      <style jsx>{`
        .pagination-wrapper {
          display: flex;
          justify-content: center;
        }
        .pagination {
          display: flex;
          column-gap: 0;
          justify-content: center;
          align-items: center;
          box-shadow: rgba(0, 0, 0, 0.15) 0 0 4px;
        }
        .pagination-button {
          padding: 10px 17px;
          color: black;
          font-size: 1em;
        }
        .pagination-button-selected {
          background-color: #FF4F4F;
          color: white;
        }
        .pagination-button + .pagination-button {
          border-left: solid 1px #dddddd
        }
      `}</style>
    </div>
  )
}

export default Paginator
