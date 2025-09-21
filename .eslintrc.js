const importRules = require('./eslintConfigs/importRules');
const react = require('./eslintConfigs/react');
const sharedRules = require('./eslintConfigs/shared');

module.exports = {
	root : true,
	env  : {
		browser : true,
		es2021  : true,
		node    : true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	parser        : '@typescript-eslint/parser',
	parserOptions : {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion : 'latest',
		sourceType  : 'module',
	},
	plugins  : ['react', 'react-hooks', '@typescript-eslint', 'import'],
	settings : {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	rules: {
		// Base JavaScript rules
		camelcase               : 'off',
		'no-tabs'               : 'off',
		indent                  : sharedRules.indent,
		'no-use-before-define'  : sharedRules['no-use-before-define'],
		'no-restricted-exports' : 'off',
		'no-underscore-dangle'  : ['error'],
		'max-len'               : ['error', 120],
		'key-spacing'           : [
			'error',
			{
				align: {
					on          : 'colon',
					beforeColon : true,
					afterColon  : true,
					mode        : 'strict',
				},
			},
		],
		'object-curly-newline': [
			'error',
			{
				ObjectExpression  : { minProperties: 8, multiline: true, consistent: true },
				ObjectPattern     : { minProperties: 8, multiline: true, consistent: true },
				ImportDeclaration : { minProperties: 8, multiline: true, consistent: true },
				ExportDeclaration : { minProperties: 8, multiline: true, consistent: true },
			},
		],
		curly  : ['error', 'all'],
		eqeqeq : [
			'error',
			'always',
			{
				null: 'never',
			},
		],
		'logical-assignment-operators' : 'error',
		'no-else-return'               : 'error',
		'no-mixed-operators'           : 'error',
		'no-console'                   : 'warn',
		'no-process-exit'              : 'error',
		'no-fallthrough'               : ['error', { commentPattern: '.*intentional fallthrough.*' }],
		'one-var'                      : ['error', 'never'],

		// Import rules
		...importRules,

		// React rules
		...react,

		// TypeScript rules (simplified - no project-dependent rules)
		'@typescript-eslint/no-empty-function'       : 'off',
		'@typescript-eslint/no-var-requires'         : 'off',
		'@typescript-eslint/no-explicit-any'         : 'off',
		'@typescript-eslint/key-spacing'             : 'off',
		'@typescript-eslint/comma-dangle'            : 'off',
		'@typescript-eslint/semi'                    : 'off',
		'@typescript-eslint/member-delimiter-style'  : 'off',
		'@typescript-eslint/no-non-null-assertion'   : 'off',
		'@typescript-eslint/no-unused-vars'          : ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
		'@typescript-eslint/consistent-type-imports' : [
			'error',
			{
				prefer                  : 'type-imports',
				disallowTypeAnnotations : true,
			},
		],

		// Quote rules (aligned with Prettier singleQuote: true)
		quotes                      : ['error', 'single', { avoidEscape: true }],
		'@typescript-eslint/quotes' : ['error', 'single', { avoidEscape: true }],
	},
	overrides: [
		{
			files : ['**/*.ts', '**/*.tsx'],
			rules : {
				// TypeScript specific overrides
				indent                                    : 'off',
				'@typescript-eslint/indent'               : sharedRules.indent,
				'no-use-before-define'                    : 'off',
				'@typescript-eslint/no-use-before-define' : sharedRules['no-use-before-define'],
			},
		},
		{
			files : ['**/*.js', '**/*.jsx'],
			rules : {
				// JavaScript specific overrides
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			files : ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
			env   : {
				jest: true,
			},
			rules: {
				'@typescript-eslint/no-explicit-any' : 'off',
				'no-console'                         : 'off',
			},
		},
		{
			files : ['packages/library/**/*'],
			rules : {
				// Library package specific rules
				'import/no-extraneous-dependencies': [
					'error',
					{
						devDependencies      : true,
						peerDependencies     : true,
						optionalDependencies : false,
					},
				],
			},
		},
		{
			files : ['packages/app/**/*'],
			rules : {
				// App package specific rules
				'import/no-extraneous-dependencies': [
					'error',
					{
						devDependencies      : true,
						peerDependencies     : true,
						optionalDependencies : false,
					},
				],
			},
		},
	],
	ignorePatterns: ['node_modules/', 'build/', 'dist/', 'coverage/', '*.min.js', '*.bundle.js'],
};
