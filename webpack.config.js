const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

module.exports = env => {
  return {
    entry: {
      app: './app.js'
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    module: {
      loaders: [
        {test: /\.js$/, loader:'babel!eslint', exclude: /node_modules/},
        {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
  }
     ]
    },
    plugins: [
      env.test ? undefined : new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
}
}
