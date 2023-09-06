const base = require('./eslint-config/base');

module.exports = {
	extends : "eslint:recommended",
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		...base,
	},
	env: {
		es6 : true,
		browser : true,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	plugins: [
		'react'
	],
	settings: {
		react: {
			version: 'detect', // Automatically detect React version
		},
	},
};