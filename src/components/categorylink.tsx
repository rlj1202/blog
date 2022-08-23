import Link from 'next/link'

import { Category } from '@/lib/blog'

const CategoryLink: React.FC<{ category: Category }> = ({ category, children }) => {
  return (
    <Link href={`/categories/${category.slug}/pages/1`} passHref>
      {children}
    </Link>
  )
}

export default CategoryLink
