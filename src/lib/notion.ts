import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId: string | undefined = process.env.NOTION_DATABASE_ID

async function getPosts() {
    if (!databaseId) {
        throw new Error('No database id')
    }

    // let database = await notion.databases.retrieve({ database_id: databaseId })
    let pages = await notion.databases.query({
        database_id: databaseId,
        filter: {
            or: [
                {
                    property: 'Published',
                    checkbox: {
                        equals: true,
                    },
                },
            ],
        },
        sorts: [
            {
                property: 'CreatedAt',
                direction: 'ascending',
            },
        ],
    })

    return [...pages.results]
}

async function test() {
    let posts = await getPosts()
    for (let post of posts) {
        if ('properties' in post) {
            if (post.properties['Title'].type == 'title') {
                console.log(post.properties['Title'].title[0].plain_text)
            }
            if (post.properties['Subtitle'].type == 'rich_text') {
                console.log(post.properties['Subtitle'].rich_text[0].plain_text)
            }
            let blocks = await notion.blocks.children.list({
                block_id: post.id,
            })
            console.log(blocks.results)
        }
    }
}
test()
