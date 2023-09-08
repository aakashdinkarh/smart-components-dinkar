const config = {
	entry : './src/exports.ts',
	input : {
		index           : 'src/exports.ts',
		InputController : 'src/components/SegmentedTabs/index.tsx',
	},
	output: [
		{
			dir       : 'dist/es',
			format    : 'esm',
			sourcemap : true,
		},
		{
			dir       : 'dist/cjs',
			format    : 'cjs',
			exports   : 'named',
			sourcemap : true,
		},
	],
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
	tsconfig         : "tsconfig.json",
	tsconfigOverride : { 
		compilerOptions: { 
			declaration    : true, 
			declarationDir : "dist/types" 
		} 
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
