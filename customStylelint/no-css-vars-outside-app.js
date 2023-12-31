const path = require('path');

const stylelint = require('stylelint');

const ruleName = 'custom/no-css-vars-outside-app';

const pathToSrcApp = path.join(__dirname, '..', 'src/app');

const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: 'Avoid the use of CSS variables outside the "src/app" directory.',
});

module.exports = stylelint.createPlugin(ruleName, (enabled) => {
	return (root, result) => {
		if (!enabled) {
			return;
		}

		// Check the file path to determine if it's outside "src/app/"
		const filePath = root.source.input.file;
		if (!filePath || filePath.includes(pathToSrcApp)) {
			return;
		}

		root.walkDecls((decl) => {
			if (decl.value.includes('var(--')) {
				stylelint.utils.report({
					ruleName,
					result,
					node    : decl,
					message : messages.rejected,
				});
			}
		});
	};
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
