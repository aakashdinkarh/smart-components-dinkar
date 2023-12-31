const overrides = require('./eslintConfigs');

module.exports = {
	root : true,
	env  : {
		browser : true,
		es2021  : true
	},
	rules: {
		...overrides.base,
		...overrides.importRules,
		...overrides.react,
		...overrides.typescript,
		'@typescript-eslint/no-unsafe-assignment'              : 'off',
		'@typescript-eslint/no-unsafe-member-access'           : 'off',
		'@typescript-eslint/no-unsafe-argument'                : 'off',
		'@typescript-eslint/no-unnecessary-condition'          : 'off',
		'@typescript-eslint/non-nullable-type-assertion-style' : 'off',

	},
	ignorePatterns : ['dist/**/*', 'node_modules/*'],
	extends        : [
		'eslint:recommended',
		'plugin:eslint-plugin/recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: [
				'.eslintrc.js', 
				'webpack.config.js',
				'eslintConfigs/**/*',
				'customStylelint/**/*',
				'scripts/*'
			],
			extends       : ['plugin:@typescript-eslint/disable-type-checked'],
			parserOptions : {
				sourceType: 'script'
			},
		},
	],
	parser        : '@typescript-eslint/parser',
	parserOptions : {
		ecmaVersion : 'latest',
		sourceType  : 'module',
		project     : [
			'./tsconfig.json',
			'./tsconfig.eslint.json',
		],
		ecmaFeatures: {
			"jsx": true
		},
		tsconfigRootDir: __dirname,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	plugins: [
		'import',
		'simple-import-sort',
	],
};
