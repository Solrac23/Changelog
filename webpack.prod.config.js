const path = require('node:path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: {
		main: './src/app.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js',
	},
	target: 'node',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(html|ejs)$/,
				use: [
					{
						loader: 'template-ejs-loader',
					},
					{
						loader: 'html-loader',
						// options: { minimize: true}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader', 'css-loader'
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			},
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css'],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: htmlWebpackPluginTemplateCustomizer({
				templatePath: './src/views/login.ejs'
			}),
			filename: '[name].html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		})
	],
}
