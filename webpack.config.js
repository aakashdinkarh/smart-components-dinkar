const path = require('path');

const getEntryObject = require('./scripts/generateComponentsEntryObject');

async function createWebpackConfig(){
	const entryObj = await getEntryObject();

	const config = {
		entry  : entryObj,
		output : {
			path     : path.resolve(__dirname, 'dist/'),
			filename : (pathData) => {
				return (pathData.chunk.name === 'index' ? 'index.js' : '[name]/index.js')
			},
			library        : '[name]', // Library name (can be imported by this name)
			libraryTarget  : 'umd', // Universal Module Definition (UMD)
			umdNamedDefine : true, // Use a named define when exporting as UMD
			clean          : true,
		},
		optimization: {
			usedExports: true, // Enables tree shaking
		},
		module: {
			rules: [
				{
					test    : /\.(js|jsx)$/,
					use     : 'babel-loader',
					exclude : /node_modules/,
				},
				{
					test : /\.css$/,
					use  : [
						'style-loader',
						{
							loader  : 'css-loader',
							options : {
								importLoaders : 1,
								modules       : true,
							},
						},
					],
				},
				{
					test    : /\.ts(x)?$/,
					loader  : 'ts-loader',
					exclude : /node_modules/,
				},
			],
		},
		externals: {
			react       : 'react', // Exclude React from the bundle (useful if it's a peer dependency)
			'react-dom' : 'react-dom', // Exclude React DOM from the bundle (useful if it's a peer dependency)
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
	};
	return config;
}

module.exports = createWebpackConfig();