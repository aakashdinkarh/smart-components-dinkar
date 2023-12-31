/* eslint-disable no-console */
const path = require('path');

const stylelint = require('stylelint');

const ruleName = 'custom/no-css-vars-outside-app';
const pathToSrcApp = path.join(__dirname, '..', 'src/app');

const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected : 'Avoid the use of CSS variables outside the "src/app" directory.',
	fixed    : (originalVal, fixedVal) => `✅ Changed ${originalVal} --> ${fixedVal}`,
});

const { parseVariableFile } = require('../scripts/parseCssVarFile');

const cssVariableFilePath = path.join(__dirname, '../', 'src/app/styles.module.css');
const cssVariables = parseVariableFile(cssVariableFilePath);

module.exports = stylelint.createPlugin(ruleName, (enabled) => {
	return (root, result) => {
		if (!enabled) {
			return;
		}

		const filePath = root.source.input.file;
		if (!filePath || filePath.includes(pathToSrcApp)) {
			return;
		}

		root.walkDecls((decl) => {
			if (decl.value.includes('var(--')) {
				const fixedValue = decl.value.replace(/var\(([^)]+)\)/g, (_, variableName) => {
					return cssVariables[variableName];
				});

				if (fixedValue && result.stylelint.config.fix) {
					console.log(messages.fixed(decl.value, fixedValue));
					decl.value = fixedValue;
				} else {
					stylelint.utils.report({
						ruleName,
						result,
						node    : decl,
						message : messages.rejected,
					});
				}
			}
		});
	};
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
module.exports.meta = {
	fixable: true
}
