const isProduction = process.env.NODE_ENV === 'production'

const baseUrl = isProduction ? '' : '/blog'

console.log('baseUrl: ' + baseUrl)

module.exports = {
    env: {
        baseUrl
    },
    assetPrefix: baseUrl,
    webpack: function(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader'
        });
        return config;
    }
}