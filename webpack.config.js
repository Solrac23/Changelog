const path = require('path')

module.exports = {
	mode: 'production',
	entry: ['@babel/polyfill','./src/app.js'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
						compact: true,
					}
				}
			}
		]
	}
}

// how setting webpack to production ?
