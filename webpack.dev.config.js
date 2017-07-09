const webpack = require('webpack');
const path = require('path');

const autoprefixer = require('autoprefixer');
require('babel-polyfill');


var config = {
	entry: ['webpack/hot/dev-server',
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&__webpack_public_path=http://localhost:' + 3000,
		'babel-polyfill',
		'./src/index.js'
	],
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/',
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
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [{
				loader: 'css-loader',
				options: {
					modules: false
				}
			}, {
				loader: 'sass-loader'
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: function () {
						return [autoprefixer('last 2 versions', 'ie 10')]
					}
				}
			}]
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
			createjs: 'imports-loader?this=>global!exports-loader?createjs!createjs'
		}),
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(false)
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	watch: true
}

module.exports = config;