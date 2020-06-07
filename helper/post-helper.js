import glob from 'glob'

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