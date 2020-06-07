// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  var glob = require('glob')

  res.statusCode = 200
  res.json({
    name: 'John Doe',
    posts: glob.sync('posts/**/*.md')
  })
}
