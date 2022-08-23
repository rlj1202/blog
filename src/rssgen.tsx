import fs from 'fs'
import path from 'path'
import { Feed } from 'feed'

import Config from '@/config'
import { Article } from '@/lib/blog'

export const generateRssFeed = async (articleAndContents: Article[]) => {
    console.log('Generate rss...')

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
    
    articleAndContents.forEach((article) => {
        feed.addItem({
            title: article.title || '',
            id: `${siteUrl}/articles/${article.slug}`,
            link: `${siteUrl}/articles/${article.slug}`,
            // description: '',
            content: article.htmlContent,
            author: [
                {
                    name: Config.author.name,
                    email: Config.author.contacts.email,
                    link: Config.author.contacts.github,
                }
            ],
            contributor: [],
            date: article.createdAt || date,
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
