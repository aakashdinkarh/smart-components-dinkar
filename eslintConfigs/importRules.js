const importRules = {
	'import/no-extraneous-dependencies': [
		'error',
		{
			devDependencies      : true,
			peerDependencies     : true,
			optionalDependencies : false,
		},
	],
	'import/prefer-default-export' : 'off',
	'import/no-unresolved'         : 'off',
	'import/order'                 : [
		'error',
		{
			groups             : ['builtin', 'external', 'parent', 'sibling', 'index'],
			'newlines-between' : 'always',
			alphabetize        : {
				order           : 'asc',
				caseInsensitive : true,
			},
		},
	],
	'import/first'                : 'warn',
	'import/newline-after-import' : 'warn',
	'import/no-absolute-path'     : 'warn',
	'import/no-amd'               : 'warn',
	'import/no-default-export'    : 'warn',
	'import/no-duplicates'        : 'warn',
	'import/no-mutable-exports'   : 'warn',
	'import/no-named-default'     : 'warn',
	'import/no-named-export'      : 'off',
	'import/no-self-import'       : 'warn',
}

module.exports = importRules;