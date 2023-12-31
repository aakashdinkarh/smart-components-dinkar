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
	'import/first'                : 'error',
	'import/newline-after-import' : 'error',
	'import/no-absolute-path'     : 'error',
	'import/no-amd'               : 'error',
	'import/no-default-export'    : 'error',
	'import/no-duplicates'        : 'error',
	'import/no-mutable-exports'   : 'error',
	'import/no-named-default'     : 'error',
	'import/no-named-export'      : 'off',
	'import/no-self-import'       : 'error',
}

module.exports = importRules;
