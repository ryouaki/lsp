const path = require('path');
const htmpPlugin = require('html-webpack-plugin');
// const package = require('./package.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const config = {
    entry: process.env.NODE_ENV === 'dev' ? './src/index.js' : {
      "lsp-ss": './index.js'
    },
    devtool: 'source-map',
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    output: process.env.NODE_ENV === 'dev' ? {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    } : {
      path: path.join(__dirname, 'dist'),
      filename: `lsp-ss.umd.js`,
      libraryTarget: 'umd',
      library: 'lsp-ss'
    },
    target: ['web', 'es5'],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            plugins: process.env.NODE_ENV === 'dev' ? [
            ] : [
              'transform-remove-console'
            ]
          },
          exclude: /node_modules/
        }
      ]
    },
    externals: process.env.NODE_ENV === 'dev' ? {} : {
      react: 'react',
      'react-dom': 'react-dom'
    }
  }

  const plugins = [];

  if (process.env.NODE_ENV === 'dev') {
    plugins.push(new htmpPlugin({
      template: 'public/index.html'
    }))
    config.devServer = {
      historyApiFallback: true
    }
  } else if (process.env.NODE_ENV === 'bundle') {
    plugins.push(new BundleAnalyzerPlugin())
  }

  config.plugins = plugins;
  return config;
}
