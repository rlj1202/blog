import { NextPage } from 'next'

const Tag: NextPage = ({ children }) => {
  return (
    <span className="tag">
      {children}

      <style jsx>{`
        .tag {
          display: inline-block;
          background-color: #EEE6C4;
          padding: 6px;
          margin-right: 6px;
          color: #938E7B;
          line-height: 100%;
        }
      `}</style>
    </span>
  )
}

export default Tag
