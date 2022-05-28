import fs from 'fs'
import { SitemapStream, streamToPromise } from 'sitemap'

import Config from '@/config'

import { getPosts } from '@/utils/postUtils'

export const generateSitemap = async () => {
    console.log('Generate sitemap...')

    const siteUrl = process.env.HOST
    const { posts } = await getPosts()

    const stream = new SitemapStream({
        hostname: siteUrl,
    })

    posts.map(post => {
        stream.write({
            url: post.url,
            changefreq: 'monthly',
            priority: 0.3,
            // img: '',
        })
    })

    Config.menus.map(menu => {
        stream.write({
            url: menu.path,
            changefreq: 'monthly',
            priority: 0.3,
        })
    })

    stream.end()

    return streamToPromise(stream).then(data => {
        fs.writeFileSync(`./public${Config.sitemap.path}`, data.toString())
    })
}

export default generateSitemap
