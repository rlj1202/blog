import Link from 'next/link'

import { Article } from '@/lib/blog'

const ArticleLink: React.FC<{ article: Article }> = ({ article, children }) => {
  return (
    <Link href={`/articles/${article.slug}`} passHref>
      {children}
    </Link>
  )
}

export default ArticleLink
