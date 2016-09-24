const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    path.join(__dirname, '/app/scripts/main.js')
  ],
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'scripts/[name].dev.js'
  },
  resolve: {
    root: [
      path.join(__dirname, '/app/scripts')
    ],
    fallback: [
      path.join(__dirname, '/node_modules')
    ],
    alias: {
      'scripts': path.join(__dirname, '/app/scripts'),
      'assets': path.join(__dirname, '/app/assets')
    }
  },
  module: {
    loaders: [
      { test: /pixi.js/, loader: 'script' },
      { test: /phaser.js/, loader: 'script' },
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'app/scripts')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
    ]
  },
  devtool: 'inline-source-map',
};
