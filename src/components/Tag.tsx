import Link from 'next/link';

const Tag: React.FC<{ tag: string }> = ({ tag, children }) => {
  return (
    <span className="tag">
      <Link href={`/tags/${tag}/pages/1`} legacyBehavior>
        <a>{children}</a>
      </Link>

      <style jsx>{`
        .tag {
          display: inline-block;
          background-color: var(--color-brand);
          font-size: 0.75rem;
          padding: 0.3rem;
          border-radius: 0.3rem;
          color: white;
          line-height: 100%;
        }
      `}</style>
    </span>
  );
};

export default Tag;
