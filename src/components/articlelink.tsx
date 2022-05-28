import Link from 'next/link'

import { Article } from '@/lib/article'

const ArticleLink: React.FC<{ article: Article }> = ({ article, children }) => {
  return (
    <Link href={`/articles/${article.slug}`} passHref>
      {children}
    </Link>
  )
}

export default ArticleLink
