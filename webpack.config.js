const path = require('node:path')
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
	const SERVER_PATH = argv.mode === 'production' ? 
		'./src/server.js' : ''

	return({
		mode: argv.mode,
		target: 'node',
		entry: {
			server: SERVER_PATH
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			filename: '[name].js',
		},
		node: {
			__dirname: true,
			__filename: true,
		},
		externals:[nodeExternals()],
		module: {
			rules: [
				{
					exclude: /node_modules/,
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
					}
				},
			]
		},
	})
}
