// const webpack = require('webpack');
// const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// require('babel-polyfill');

// var config = {
//     entry: ['babel-polyfill', './src/index.js'],
//     output: {
//         path: path.join(__dirname, 'build'),
//         filename: 'app.bundle.js'
//     },
//     module: {
//         rules: [{
//             enforce: 'pre',
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: 'eslint-loader'
//         }, {
//             test: /\.(js|jsx)$/,
//             exclude: /node_modules/,
//             use: 'babel-loader'
//         }]
//     },
//     resolve: {
//         alias: {
//             createjs: path.resolve('./src/libs/createjs-2015.11.26.min.js')
//         }
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             $: 'jquery',
//             createjs: 'imports?this=>global!exports?createjs!createjs'
//         }),

//         new webpack.DefinePlugin({
// 			PRODUCTION: JSON.stringify(true)
// 		}),
//         new webpack.optimize.UglifyJsPlugin({
//             comments: false,
//             compress: {
//                 warnings: false,
//                 drop_console: true
//             }
//         })
//     ]
// }

// module.exports = config;


const webpack = require('webpack');
const path = require('path');

const autoprefixer = require('autoprefixer');
require('babel-polyfill');


var config = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(jpg|png|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    outputPath: './assets/images/',
                    limit: 100
                }
            }]

        }]
    },
    resolve: {
        alias: {
            createjs: path.resolve('./src/libs/createjs-2015.11.26.min.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            createjs: 'imports?this=>global!exports?createjs!createjs'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true)
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     comments: false,
        //     compress: {
        //         warnings: false,
        //         drop_console: true
        //     }
        // })
    ]
}

module.exports = config;