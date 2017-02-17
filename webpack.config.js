const webpack = require('webpack');
var path = require('path');

var config = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js|jsx$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
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
        })
    ],
	watch: true
}

module.exports=config;