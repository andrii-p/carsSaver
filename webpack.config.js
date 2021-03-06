var webpack = require("webpack");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var path = require('path');

process.noDeprecation = true;

module.exports = {
    entry: './src/main/resources/static/js/index.js',
    output: {
        path: path.join(__dirname, "src/main/resources/static/dist"),
        filename: 'bundle.js',
        publicPath: "dist",
        sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    devServer: {
        inline: true,
        contentBase: './src/main/resources/static',
        port: 3001
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader', {
                    loader: 'postcss-loader',
                    options: {
                      plugins: () => [require('autoprefixer')]
                    }}]
            },
            {
                test: /\.scss/,
                use: ['style-loader','css-loader', {
                    loader: 'postcss-loader',
                    options: {
                      plugins: () => [require('autoprefixer')]
                    }}, 'sass-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: false
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        })
    ]

}
