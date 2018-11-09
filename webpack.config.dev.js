// webpack dev config

// ..
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// webpack plugin
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const HtmlWebpackPlugin = require('html-webpack-plugin');

// ..
// const pkg = require('./package.json');
const settings = require('./webpack.config.settings.js');
const base = require('./webpack.config.base.js');

// Configure devserver
const configDevServer = () => {
    return {
        host: '10.0.128.183',
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 3000,
        inline: true,
        hot: true,
        disableHostCheck: true
        // public: settings.devServerConfig.public(),
        // contentBase: path.join(__dirname, './'),
        // compress: true,
        // host: settings.devServerConfig.host(),
        // port: settings.devServerConfig.port(),
        // https: !!parseInt(settings.devServerConfig.https()),
        // inline: true,
        // quiet: true,
        // hot: true,
        // hotOnly: true,
        // overlay: true,
        // stats: 'errors-only',
        // watchOptions: {
        //     poll: !!parseInt(settings.devServerConfig.poll())
        // },
        // headers: {
        //     'Access-Control-Allow-Origin': '*'
        // }
    };
};

// Configure style loader
const configStyleLoader = () => {
    return {
        test: /\.less$/,
        include: [
            path.resolve(__dirname, settings.paths.src.css)
        ],
        use: [
            {
                loader: 'style-loader',
            },
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
        // template: 'ejs-render-loader!index.ejs',
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

// webpack dev exports
module.exports = [
    merge(
        base.baseConfig,
        {
            output: {
                filename: path.join('./js', '[name].[hash].js'),
                publicPath: settings.devServerConfig.public() + '/'
            },
            mode: 'development',
            devtool: 'inline-source-map',
            devServer: configDevServer(),
            module: {
                rules: [
                    configImageLoader(),
                    configStyleLoader()
                ]
            },
            plugins: [
                new DashboardPlugin(dashboard.setData),
                new HtmlWebpackPlugin(
                    configHtml()
                ),
                new webpack.HotModuleReplacementPlugin()
            ]
        }
    )
];
