/* eslint-disable no-console */
const fs = require('fs');

function parseVariableFile(filePath) {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const variableValues = {};

		// Regular expression to match CSS variable declarations
		const variableDeclarationRegex = /(--[^:\s]+)\s*:\s*([^;\n]+)/g;

		let match;
		while ((match = variableDeclarationRegex.exec(fileContent)) != null) {
			const variableName = match[1];
			const variableValue = match[2];
			variableValues[variableName] = variableValue;
		}

		return variableValues;
	} catch (error) {
		console.error(`Error reading or parsing variable file: ${error.message}`);
		return {};
	}
}

module.exports = { parseVariableFile };
