module.exports = {
	extends : ['stylelint:recommended'],
	rules   : {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
		'selector-class-pattern': null,
	},
};
