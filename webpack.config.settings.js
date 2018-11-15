// webpack settings config

// node modules
require('dotenv').config();

// webpack settings exports
module.exports = {
    name: '',
    paths: {
        src: {
            base: './src/',
            js: './src/js/',
            css: './src/less/',
            img: './src/img/'
        },
        dist: {
            base: './dist/',
            clean: [
                "./img",
                "./criticalcss",
                "./css",
                "./js"
            ]
        }
    },
    urls: {
        dev: '',
        dist: '/',
        prod: 'https://qrss.treedom.cn/streetgame/',
        handover: '//ossweb-img.qq.com/images/a20171121act/'
    },
    entries: {
        'main': 'index.js'
    },
    copyWebpackConfig: {
        src: [
            {
                from: './src/img/kf',
                to: 'img',
                flatten: true
            }
        ],
        handover: [
            {
                from: './src/img/kf',
                to: './',
                flatten: true
            }
        ]
    },
    devServerConfig: {
        public: () => process.env.DEVSERVER_PUBLIC || 'http://localhost:3000',
        host: () => process.env.DEVSERVER_HOST || 'localhost',
        poll: () => process.env.DEVSERVER_POLL || false,
        port: () => process.env.DEVSERVER_PORT || 3000,
        https: () => process.env.DEVSERVER_HTTPS || false
    }
};
