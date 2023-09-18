const overrides = require('./configs/overrides');

module.exports = {
	extends: [
		"plugin:react/recommended",
		"plugin:import/warnings",
		"plugin:import/errors"
	],
	parser         : '@typescript-eslint/parser',
	ignorePatterns : ['dist/**/*', '!.stylelintrc.js'],
	parserOptions  : { project: './tsconfig.json', tsconfigRootDir: __dirname },
	rules          : {
		...overrides.base,
		...overrides.react,
		...overrides.typescript,
	},
	plugins : ['@typescript-eslint', 'import'],
	env     : {
		es6     : true,
		browser : true,
	},
	globals: {
		Atomics           : 'readonly',
		SharedArrayBuffer : 'readonly',
	},
	root: true,
};
