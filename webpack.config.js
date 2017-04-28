const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.js', '.jsx'
    ],
    modules: [
      'node_modules', 'bower_components'
    ],
    descriptionFiles: ['package.json', 'bower.json']
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', 
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true,
    lazy: false,
/*    historyApiFallback: {
      index: '/'
    },*/
    proxy: {
      '/**': { 
        target: '/index.html', 
        secure: false,
        bypass: function (req, res, opt) {
          if (req.path.indexOf('/img/') !== -1 || req.path.indexOf('/public/') !== -1) {
            return '/'
          }

          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html';
          }
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({title: "Plug dj test", template: 'index.html', filename: 'index.html'}),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist'])
  ]
};
