// webpack.server.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { server: './src/main.server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [],
  output: {
    path: path.join(__dirname, 'dist/portfolio-website'),
    filename: '[name].js',
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    ),
  ],
};