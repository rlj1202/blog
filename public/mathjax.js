window.MathJax = {
    loader: {
        load: [ '[tex]/ams', '[tex]/autoload' ]
    },
    tex: {
        packages: { '[+]': [ 'ams', 'autoload' ] },
        autoload: {
            ams: [ 'tag' ]
        },
        inlineMath: [ ['$', '$'], ['\\(', '\\)'] ],
        displayMath: [ ['$$', '$$'], ['\\[', '\\]'] ],
        processEscapes: true,
        tags: 'ams',
        tagSide: 'right',
        tagIndent: '0.8em',
        useLabelIds: false,
        ams: {
            multlineWidth: '100%',
            multlineIndent: '1em'
        }
    },
    svg: {
        fontCache: 'global'
    }
}
