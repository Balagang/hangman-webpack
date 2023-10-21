const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { title } = require('process')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: {
        bundle: './src/scripts/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'scripts/[name][contenthash].js',
        clean: true, // remove previous html hash-file
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.s[ac]ss$/i, // _/i = case insensitive
                use: ["style-loader", "css-loader", "sass-loader"]
            }, {
                test: /\.css$/i, // _/i = case insensitive
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [ // create html file into output folder
        new HtmlWebpackPlugin({
            title: 'Hangman Game',
            filename: 'index.html',
            template: 'src/index.html'
        }),
        // new BundleAnalyzerPlugin()
    ],
    devtool: 'source-map', // create .map file in output folder for debug
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        port: 3000,
        open: true, // luanch browser
        hot: true, // hot re-loading
        compress: true, // enable g zip compression
        historyApiFallback: true,

    }
}
