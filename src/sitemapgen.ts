import fs from 'fs'
import { SitemapStream, streamToPromise } from 'sitemap'

import Config from '@/config'

import { articles } from '@/lib/article'

export const generateSitemap = async () => {
    const siteUrl = process.env.HOST || 'localhost'

    console.log(`Generate sitemap... : host = ${siteUrl}`)

    const stream = new SitemapStream({
        hostname: siteUrl,
    })

    articles.map(article => {
        stream.write({
            url: `/articles/${article.slug}`,
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
