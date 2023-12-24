const sharedRules = require('./shared');

const typescript = {
	// typescript overrides
	indent                                          : 'off',
	'@typescript-eslint/indent'                     : sharedRules.indent,
	'no-use-before-define'                          : 'off',
	'@typescript-eslint/no-use-before-define'       : sharedRules['no-use-before-define'],
	'@typescript-eslint/no-empty-function'          : 'off',
	'@typescript-eslint/no-var-requires'            : 'off',
	'@typescript-eslint/no-explicit-any'            : 'off',
	'@typescript-eslint/key-spacing'                : 'off',
	'@typescript-eslint/comma-dangle'               : 'off',
	'@typescript-eslint/semi'                       : 'off',
	'@typescript-eslint/member-delimiter-style'     : 'off',
	'@typescript-eslint/strict-boolean-expressions' : 'warn',
	'@typescript-eslint/consistent-type-imports'    : [
		'error',
		{ prefer: 'type-imports', disallowTypeAnnotations: true },
	],
	'@typescript-eslint/no-non-null-assertion': 'off',
}

module.exports = typescript;