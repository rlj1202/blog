import Link from 'next/link'

const Tag: React.FC<{ tag: string }> = ({ tag, children }) => {
  return (
    <span className="tag">
      <Link href={`/tags/${tag}/pages/1`}>
        <a>{children}</a>
      </Link>

      <style jsx>{`
        .tag {
          display: inline-block;
          background-color: var(--color-brand);
          padding: 0.5em;
          color: white;
          line-height: 100%;
        }
      `}</style>
    </span>
  )
}

export default Tag
