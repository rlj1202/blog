import type { NextPage } from 'next'

import dateFormat from 'dateformat'

import Tag from '../components/tag'
import PostLink from '../components/postlink'

import { Post } from '../utils/postUtils'

const PostCard: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <div className="postcard">
      <PostLink postPath={post.postPath}>
        <a><div className="postcard-img-box">
          {post.metadata.imgs && post.metadata.imgs.length > 0 && ( <img className="postcard-img" src={post.metadata.imgs[0]} /> )}
        </div></a>
      </PostLink>
      <header className="postcard-header">
        <h1 className="postcard-title">
          <PostLink postPath={post.postPath}>
            <a>{post.metadata.title || post.postPath.join('/')}</a>
          </PostLink>
        </h1>
        <h2 className="postcard-subtitle">
          {post.metadata.subtitle}
        </h2>
        <div className="postcard-date">
          {dateFormat(post.metadata.date, 'yyyy-mm-dd')}
        </div>
        <div className="postcard-tags">
          {post.metadata.tags?.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>

      <style jsx>{`
        .postcard {
          box-shadow: rgba(0, 0, 0, 0.15) 0 0 4px;
          flex-basis: 300px;
          flex-grow: 1;

          display: flex;
          flex-direction: column;
        }
        .postcard-img-box {
          background-color: gray;
          height: 200px;
        }
        .postcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .postcard-header {
          padding: 20px;
          flex-grow: 1;

          display: flex;
          flex-direction: column;
        }
        .postcard-title {
          font-size: 1em;
          font-weight: bold;
          margin: 0;
          margin-bottom: 10px;

          flex-grow: 1;
        }
        .postcard-subtitle {
          font-size: 1em;
          font-weight: normal;
          margin: 0;
          margin-bottom: 10px;
          color: #999999;
        }
        .postcard-date {
          font-size: 0.9em;
          color: #999999;
        }
        .postcard-tags {
          font-size: 0.9em;
          margin-top: 10px;

          display: flex;
          flex-wrap: wrap;
          row-gap: 6px;
        }
      `}</style>
    </div>
  )
}

export default PostCard
