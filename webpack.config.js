const path = require('path');

const webpack = require('webpack');

const config = {
	entry  : './src/lib/index.ts',
	output : {
		path          : path.resolve(__dirname, 'dist'),
		filename      : 'index.js',
		library       : 'Select',
		libraryTarget : 'umd',
		publicPath    : '/dist'
	},
	module: {
		rules: [
			{
				test    : /\.(js|ts|jsx)$/,
				use     : 'swc-loader',
				exclude : /node_modules/
			},
			{
				test : /\.css$/,
				use  : [
					'style-loader',
					{
						loader  : 'css-loader',
						options : {
							importLoaders : 1,
							modules       : true
						}
					}
				]
			},
		]
	},
	externals: {
		react: {
			commonjs  : "react",
			commonjs2 : "react",
			amd       : "React",
			root      : "React"
		},
		"react-dom": {
			commonjs  : "react-dom",
			commonjs2 : "react-dom",
			amd       : "ReactDOM",
			root      : "ReactDOM"
		}
	},
	resolve: {
		extensions: [
			'.tsx',
			'.ts',
			'.js'
		],
		alias: {
			'react'     : path.resolve(__dirname, './node_modules/react'),
			'react-dom' : path.resolve(__dirname, './node_modules/react-dom'),
		}
	},
};

module.exports = config;
