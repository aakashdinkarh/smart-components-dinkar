const react = {
	// react
	'react/button-has-type'               : 'off',
	'react/jsx-filename-extension'        : 'off',
	'react/prop-types'                    : 'off',
	'react/jsx-props-no-spreading'        : 'off',
	'react/forbid-prop-types'             : 'off',
	'react/react-in-jsx-scope'            : 'off',
	'react/no-unstable-nested-components' : 'off',
	'react/jsx-indent-props'              : ['error', 'tab'],
	'react/require-default-props'         : 'off',
	'react/jsx-indent'                    : ['error', 'tab', {
		checkAttributes          : true,
		indentLogicalExpressions : true,
	}],

	// jsx-a11y
	'jsx-a11y/media-has-caption'            : 'off',
	'jsx-a11y/click-events-have-key-events' : 'off',
	'jsx-a11y/label-has-associated-control' : 'off',
};

module.exports = react;