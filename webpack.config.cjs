const path = require('path')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV !== 'development'

const copyConfig = {
    patterns: [
        {
            from: './src/resources/assets/public',
            to: 'res',
        },
    ],
}

const config = {
    mode: isProd ? 'production' : 'development',
    entry: {
        main: ['./src/resources/scripts/main.js', './src/resources/scss/main.scss'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    resolve: {
        alias: {
            vue: path.resolve(__dirname, `node_modules/vue/dist/vue.cjs${isProd ? '.prod' : ''}.js`),
        },
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                main: {
                    test: /node_modules/,
                    name: 'libs',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|eot|woff)$/i,
                type: 'asset',
            },
            {
                test: /\.scss/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin(copyConfig),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
}

if (!isProd) {
    config.devtool = 'inline-source-map'
    config.entry.main.push('webpack-hot-middleware/client')
    config.plugins.push(new HotModuleReplacementPlugin())
}

module.exports = config
