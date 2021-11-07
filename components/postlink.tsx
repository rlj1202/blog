import { NextPage } from 'next'
import Link from 'next/link'

const PostLink: NextPage<{ postPath: string[] }> = ({ postPath, children }) => {
  return (
    <Link href={`/articles/${postPath.join('/')}`} passHref>
      {children}
    </Link>
  )
}

export default PostLink
