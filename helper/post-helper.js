import matter from 'gray-matter'
import glob from 'glob'

var posts;

/**
 * getPosts
 * @return {Map}
 */
export function getPosts() {
    if (!posts) {
        posts = (context => {
            const keys = context.keys()
            const values = keys.map(context)

            var data = new Map();

            keys.forEach((key, index) => {
                const slug = key
                    .replace(/ /g, '-')
                    .slice(0, -3)
                    .trim()
                    .split('/')
                    .slice(1)
                const value = values[index]
                const document = matter(value.default, {
                    excerpt_separator: '<!-- more -->'
                })

                data.set(slug, {
                    frontmatter: JSON.stringify(document.data),
                    markdownBody: document.content,
                    markdownExcerpt: document.excerpt
                });
            });

            return data
        })(require.context('../posts', true, /\.md$/))
    }

    return posts;
}

export function getPostSlugs() {
    const posts = glob.sync('posts/**/*.md')
    const postSlugs = posts.map(post => post
        .replace(/ /g, '-') // Replace all blanks into dash.
        .slice(0, -3) // Drop last three letter, '.md'.
        .trim()
        .split('/')
        .slice(1) // Drop first directory path 'posts'.
        .join('/')
    )

    return postSlugs
}