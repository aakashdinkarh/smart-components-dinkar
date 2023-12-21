const overrides = require('./eslintConfigs');

module.exports = {
	root : true,
	env  : {
		browser : true,
		es2021  : true
	},
	rules: {
		...overrides.base,
		...overrides.react,
		...overrides.typescript,
	},
	ignorePatterns : ['dist/**/*', 'node_modules/*'],
	extends        : [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended'
	],
	overrides: [
		{
			// add files which will run in node environment
			env: {
				node: true
			},
			files         : ['.eslintrc.js', 'webpack.config.js', './eslintConfigs/*', 'scripts/*'],
			parserOptions : {
				sourceType: 'script'
			}
		}
	],
	parser        : '@typescript-eslint/parser', // Specify the parser for TypeScript files
	parserOptions : {
		ecmaVersion  : 'latest',
		sourceType   : 'module',
		ecmaFeatures : {
			"jsx": true
		}
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	plugins: ['@typescript-eslint', 'react', 'import'],
};
