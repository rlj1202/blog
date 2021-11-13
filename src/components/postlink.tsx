import Link from 'next/link'

import { Post } from '../utils/postUtils'

const PostLink: React.FC<{ post: Post }> = ({ post, children }) => {
  return (
    <Link href={post.url} passHref>
      {children}
    </Link>
  )
}

export default PostLink
