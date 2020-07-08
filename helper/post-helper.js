import matter from 'gray-matter'

var posts;

/**
 * getPosts
 * @return {Map} Key is string like 'dir/dir/postname' and value is an object
 *               like { slug, frontmatter, markdownBody, markdownExcerpt }.
 *               frontmatter is returned stringified. Because if the frontmatter
 *               contains non-literal data, it will be failed to be passed
 *               as props.
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

                data.set(slug.join('/'), {
                    frontmatter: JSON.stringify(document.data),
                    markdownBody: document.content,
                    markdownExcerpt: document.excerpt,
                    slug
                });
            });

            return data
        })(require.context('../posts', true, /\.md$/))
    }

    return posts;
}