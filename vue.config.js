const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
	//基本路径
	publicPath: "./",
	//输出文件目录
	outputDir: 'xiaogz',
	//放置生成静态资源（js、css、img、fonts）的目录
	assetsDir: 'assets',
	/* 开启css文件定位,设置为true可能会影响性能，可以在开发时开启 */
	css: {
		sourceMap: true
	},
	chainWebpack: config => {
		config
				.plugin('webpack-bundle-analyzer')
				.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
	},
	/* chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('_c', resolve('src/components/'))
			.set('_as', resolve('src/assets/'))
			.set('_v', resolve('src/views/'))
		config.resolve.extensions.merge(['js','vue','json','less','css'])
	}, */
	devServer: {
		proxy: { //配置跨域
			'/index': {
				target: 'http://localhost:3000/index',
				changeOrigin: true,
				secure: true
			}
		}
	}
}