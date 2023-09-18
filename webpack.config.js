const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/exports.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'DinkarLibrary', // Library name (can be imported by this name)
    libraryTarget: 'umd', // Universal Module Definition (UMD)
    umdNamedDefine: true, // Use a named define when exporting as UMD
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  externals: {
    react: 'react', // Exclude React from the bundle (useful if it's a peer dependency)
    'react-dom': 'react-dom', // Exclude React DOM from the bundle (useful if it's a peer dependency)
  },
};

module.exports = config;
