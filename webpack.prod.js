const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './client.jsx',
  mode: 'production',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'public', 'javascript'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify('http://superhero.johncarmichael.me/api'),
    }),

    new CopyPlugin([
      { from: path.resolve(__dirname, 'public', 'index.html'), to: path.resolve(__dirname, 'dist', 'public', 'index.html') },
    ]),
  ],
}
