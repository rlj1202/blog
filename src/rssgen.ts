import fs from 'fs'
import path from 'path'
import { Feed } from 'feed'

import Config from './config'
import { getPosts } from './utils/postUtils'

export const generateRssFeed = async () => {
    const { posts } = await getPosts()
    const siteUrl = process.env.HOST
    const date = new Date()

    const feed = new Feed({
        title: Config.title,
        description: Config.description,
        id: `${siteUrl}`,
        link: `${siteUrl}`,
        language: 'ko-KR',
        // image: `${siteUrl}/some_image.png`,
        favicon: `${siteUrl}${Config.favicon}`,
        copyright: Config.copyright,
        feedLinks: {
            rss2: `${siteUrl}${Config.rss.rss2Path}`,
            json: `${siteUrl}${Config.rss.json1Path}`,
            atom: `${siteUrl}${Config.rss.atom1Path}`,
        },
        author: {
            name: Config.author.name,
            email: Config.author.contacts.email,
            link: Config.author.contacts.github,
        }
    })
    
    posts.map(post => {
        feed.addItem({
            title: post.metadata.title || '',
            id: `${siteUrl}${post.url}`,
            link: `${siteUrl}${post.url}`,
            // description: '',
            content: post.content,
            author: [
                {
                    name: Config.author.name,
                    email: Config.author.contacts.email,
                    link: Config.author.contacts.github,
                }
            ],
            contributor: [],
            date: post.metadata.date || date,
            // image: '',
        })
    })
    
    feed.addCategory('Technologie')
    
    fs.mkdirSync(`./public${path.dirname(Config.rss.rss2Path)}`, { recursive: true })
    fs.mkdirSync(`./public${path.dirname(Config.rss.atom1Path)}`, { recursive: true })
    fs.mkdirSync(`./public${path.dirname(Config.rss.json1Path)}`, { recursive: true })
    fs.writeFileSync(`./public${Config.rss.rss2Path}`, feed.rss2())
    fs.writeFileSync(`./public${Config.rss.atom1Path}`, feed.atom1())
    fs.writeFileSync(`./public${Config.rss.json1Path}`, feed.json1())
}

export default generateRssFeed
