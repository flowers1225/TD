// webpack base config
// const LEGACY_CONFIG = 'legacy';
// const MODERN_CONFIG = 'modern';

const path = require('path');
const merge = require('webpack-merge');

// webpack plugin
const WebpackNotifierPlugin = require('webpack-notifier');

const pkg = require('./package.json');
const settings = require('./webpack.config.settings.js');

// Configure Entries
const configEntries = () => {
    let entries = {};
    for (const [key, value] of Object.entries(settings.entries)) {
        entries[key] = path.resolve(__dirname, settings.paths.src.js + value);
    }
    return entries;
};

// Configure Babel loader
const configBabelLoader = () => {
    return {
        test: /\.js$/,
        include: [
            path.resolve(__dirname, settings.paths.src.js)
        ],
        exclude: [
            path.resolve(__dirname, settings.paths.src.js + 'lib')
        ],
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env', {
                            modules: false,
                            useBuiltIns: 'entry',
                            targets: {}
                        }
                    ]
                ],
                plugins: [
                    '@babel/plugin-syntax-dynamic-import',
                    [
                        '@babel/plugin-transform-runtime', {
                            'regenerator': true
                        }
                    ]
                ]
            }
        }
    };
};

// Configure Font loader
const configFontLoader = () => {
    return {
        test: /\.(tff|eot2|woff2?)$/i,
        use: {
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]'
            }
        }
    };
};

// Configure Media loader
const configMediaLoder = () => {
    return {
        test: /\.(mp3|mp4?)$/i,
        use: {
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]'
            }
        }
    };
};

// webpack base config
const baseConfig = {
    name: pkg.name,
    entry: configEntries(),
    output: {
        path: path.resolve(__dirname, settings.paths.dist.base)
    },
    module: {
        rules: [
            configFontLoader(),
            configMediaLoder()
        ]
    },
    plugins: [
        new WebpackNotifierPlugin({title: 'Webpack', excludeWarnings: true, alwaysNotify: true})
    ],
    resolve: {
        alias: {},
        extensions: ['.ts', '.js']
    }
};

// build webpack config
const buildConfig = {
    module: {
        rules: [
            configBabelLoader()
        ]
    },
    plugins: [
        // ..
    ]
};

// production webpack config
const prodConfig = {
    module: {
        rules: [
            // ..
        ]
    },
    plugins: [
        // ..
    ]
};

// handover webpack config
const handoverConfig = {
    module: {
        rules: [
            // ..
        ]
    },
    plugins: [
        // ..
    ]
};

// webpack base exports
module.exports = {
    'baseConfig': merge(
        baseConfig
    ),
    // 'buildConfig': merge(
    //     baseConfig,
    //     buildConfig
    // ),
    // 'prodConfig': merge(
    //     baseConfig,
    //     prodConfig
    // ),
    // 'handoverConfig': merge(
    //     baseConfig,
    //     handoverConfig
    // )
};
