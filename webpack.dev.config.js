const webpack = require('webpack');
const path = require('path');

const autoprefixer = require('autoprefixer');
require('babel-polyfill');


var config = {
	entry: ['babel-polyfill', './src/index.js'],

	devtool: 'source-map',
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
			PRODUCTION: JSON.stringify(false)
		})
	],
	watch: true
}

module.exports = config;