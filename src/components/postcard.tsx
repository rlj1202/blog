import dateFormat from 'dateformat'

import Tag from './tag'
import PostLink from './postlink'

import { Post } from '../utils/postUtils'

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="postcard">
      <PostLink post={post}>
        <a><div className="postcard-preview-box">
          {post.metadata.imgs && post.metadata.imgs.length > 0 ? (
            <img className="postcard-img" src={post.metadata.imgs[0]} alt={''} />
          ) : (
            <div className="postcard-excerpt">
              {post.metadata.excerpt}
            </div>
          )}
        </div></a>
      </PostLink>
      <header className="postcard-header">
        {post.postPath.length > 1 && (
          <div className="postcard-categories">
            {post.postPath.slice(0, -1).join('/')}
          </div>
        )}
        <h1 className="postcard-title">
          <PostLink post={post}>
            <a>{post.metadata.title || post.postPath.join('/')}</a>
          </PostLink>
        </h1>
        <h2 className="postcard-subtitle">
          {post.metadata.subtitle}
        </h2>
        <h2 className="postcard-date">
          {dateFormat(post.metadata.date, 'yyyy-mm-dd')}
        </h2>
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="postcard-tags">
            {post.metadata.tags?.map(tag => (
              <Tag tag={tag} key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </header>

      <style jsx>{`
        .postcard {
          box-shadow: rgba(0, 0, 0, 0.05) 0 0 20px 5px;
          flex-basis: 300px;
          flex-grow: 1;

          display: flex;
          flex-direction: column;
        }
        .postcard-preview-box {
          background-color: gray;
          height: 13em;
          overflow: hidden;
        }
        .postcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .postcard-img, .postcard-excerpt {
          transform: scale(100%, 100%);
          transition: transform 0.25s ease-in-out;
        }
        .postcard-img:hover, .postcard-excerpt:hover {
          transform: scale(120%, 120%);
        }
        .postcard-excerpt {
          padding: 1.5em;
          overflow: hidden;
          word-break: break-all;
          height: 100%;
          width: 100%;
          color: #dddddd;
          position: relative;
        }
        .postcard-excerpt::before {
          display: block;
          position: absolute;
          content: "";
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;

          background: linear-gradient(#00000000 50%, gray 95%);
        }
        .postcard-header {
          padding: 1.5em;
          flex-grow: 1;

          display: flex;
          flex-direction: column;
          row-gap: 10px;
        }
        .postcard-categories {
          color: #999999;
          font-size: 0.9em;
        }
        .postcard-title {
          font-size: 1.3em;
          font-weight: bold;
          margin: 0;
        }
        .postcard-subtitle {
          font-size: 1em;
          font-weight: normal;
          margin: 0;

          flex-grow: 1;
        }
        .postcard-date {
          font-size: 0.9em;
          font-weight: normal;
          margin: 0;
        }
        .postcard-tags {
          font-size: 0.9em;

          display: flex;
          flex-wrap: wrap;
          row-gap: 6px;
          column-gap: 6px;
        }
      `}</style>
    </div>
  )
}

export default PostCard
