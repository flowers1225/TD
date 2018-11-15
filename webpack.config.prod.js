// webpack prod config

// ..
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
// const glob = require('glob-all');

// webpack plugin
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const PurgecssPlugin = require('purgecss-webpack-plugin');
// const WhitelisterPlugin = require('purgecss-whitelister');

// ..
const settings = require('./webpack.config.settings.js');
const base = require('./webpack.config.base.js');

// Configure Clean webpack
const configureCleanWebpack = () => {
    return {
        root: path.resolve(__dirname, settings.paths.dist.base),
        verbose: true,
        dry: false
    };
};

// Configure PurgeCSS
// const configPurgeCss = () => {
//     let paths = [];
//     for (const [key, value] of Object.entries(settings.purgeCssConfig.paths)) {
//         paths.push(path.join(__dirname, value));
//     }
//     return {
//         paths: glob.sync(paths),
//         whitelist: WhitelisterPlugin(settings.purgeCssConfig.whitelist),
//         whitelistPatterns: settings.purgeCssConfig.whitelistPatterns,
//         extractors: [{
//             extensions: settings.purgeCssConfig.extensions
//         }]
//     };
// };

// Configure style loader
const configStyleLoader = () => {
    return {
        test: /\.less$/,
        include: [
            path.resolve(__dirname, settings.paths.src.css)
        ],
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    // importLoaders: 2,
                    sourceMap: true
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: "less-loader", 
                options: {
                    sourceMap: true
                }
            }
        ]
    }
};

// Configure Image loader
const configImageLoader = () => {
    return {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        include: [
            path.resolve(__dirname, settings.paths.src.img)
        ],
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 4000,
                    name: 'img/[name].[hash].[ext]'
                }
            }
        ]
    };
};

// Configure html
const configHtml = () => {
    return {
        filename: './index.html',
        template: 'index.ejs',
        inject: false,
        hash: false,
        minify: {
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: false, // 删除空白符与换行符
            minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
            minifyJS: true // 压缩 HTML 中出现的 JS 代码
        }
    };
};

const configProd = (buildType) => {
    console.log('buildType:' + buildType);

    if (buildType === 'DIST') {
        return {
            output: {
                path: path.resolve(__dirname, settings.paths.dist.base),
                filename: path.join('./js', '[name].[chunkhash].js'),
                publicPath: settings.urls.dist
            },
            mode: 'production',
            devtool: 'source-map',
            module: {
                rules: [
                    configImageLoader(),
                    configStyleLoader()
                ]
            },
            plugins: [
                new CleanWebpackPlugin(settings.paths.dist.clean,
                    configureCleanWebpack()
                ),
                new webpack.optimize.ModuleConcatenationPlugin(),
                new HtmlWebpackPlugin(
                    configHtml()
                ),
                new MiniCssExtractPlugin({
                    path: path.resolve(__dirname, settings.paths.dist.base),
                    filename: path.join('./css', '[name].[chunkhash].css'),
                })
            ]
        }
    }

    if (buildType === 'PROD') {
        // ..
    }
    
}
// webpack prod exports
module.exports = [
    merge(
        base.baseConfig,
        configProd(process.env.BUILD_TYPE)
    )
];
