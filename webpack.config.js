const path = require('path');
const htmpPlugin = require('html-webpack-plugin');
const package = require('./package.json');

module.exports = (env) => {
  const config = {
    entry: process.env.NODE_ENV === 'dev' ? './src/index.js' : {
      "ss": './index.js'
    },
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    output: process.env.NODE_ENV === 'dev' ? {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    } : {
      path: path.join(__dirname, 'dist'),
      filename: `ss.umd.${package.version}.js`,
      libraryTarget: 'umd',
      library: 'ss'
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
  }

  config.plugins = plugins;
  return config;
}
