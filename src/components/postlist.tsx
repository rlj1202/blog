import Paginator from './paginator'
import PostCard from './postcard'
import { Post } from '../utils/postUtils'
import Config from '../config'

const PostList: React.FC<{
  title?: string,
  curPage?: number,
  perPage?: number,
  pageUrl: (page: number) => string,
  posts: Post[],
}> = ({ title, curPage = 1, perPage = Config.postsPerPage, pageUrl, posts }) => {
  var start = (curPage - 1) * perPage

  return (
    <div className="main">
      <h1 className="title">{title}</h1>

      <div className="posts">
        {posts.slice(start, start + perPage).map(post => (
          <PostCard key={post.postPath.join('/')} post={post} />
        ))}
      </div>

      <Paginator curPage={curPage} total={posts.length} perPage={perPage} pageUrl={pageUrl} />

      <style jsx>{`
        .posts {
          display: flex;
          flex-wrap: wrap;
          row-gap: 40px;
          column-gap: 40px;
          margin: 40px 0;
        }
      `}</style>
    </div>
  )
}

export default PostList
