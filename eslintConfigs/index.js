const importRules = require('./importRules')
const react = require('./react');
const sharedRules = require('./shared');
const typescript = require('./typescript');

const base = {
	// js
	camelcase               : 'off',
	'no-tabs'               : 'off',
	indent                  : sharedRules.indent,
	'no-use-before-define'  : sharedRules['no-use-before-define'],
	'no-restricted-exports' : 'off',
	'no-underscore-dangle'  : ['error'],
	'max-len'               : ['error', 120],
	'key-spacing'           : ['error', {
		align: {
			on          : 'colon',
			beforeColon : true,
			afterColon  : true,
			mode        : 'strict',
		},
	}],
	'object-curly-newline': ['error', {
		ObjectExpression  : { minProperties: 8, multiline: true, consistent: true },
		ObjectPattern     : { minProperties: 8, multiline: true, consistent: true },
		ImportDeclaration : { minProperties: 8, multiline: true, consistent: true },
		ExportDeclaration : { minProperties: 8, multiline: true, consistent: true },
	}],
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
	'no-fallthrough'               : [
		'error',
		{ commentPattern: '.*intentional fallthrough.*' },
	],
	'one-var': ['error', 'never'],
};

const overrides = {
	base,
	importRules,
	react,
	typescript,
};

module.exports = overrides;
