const indent = require('./indent');

module.exports = {
	// js
	camelcase               : 'off',
	'no-tabs'               : 'off',
	indent					: { ...indent },
    'no-use-before-define'	: ['error', { functions: true, classes: true, variables: true }],
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

	// import
	'import/no-extraneous-dependencies' : 'off',
	'import/prefer-default-export'      : 'off',
	'import/order'                      : ['error',
		{
			groups             : ['builtin', 'external', 'parent', 'sibling', 'index'],
			'newlines-between' : 'always',
			alphabetize        : {
				order           : 'asc',
				caseInsensitive : true,
			},
		},
	],
};