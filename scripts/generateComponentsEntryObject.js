const fs = require('fs/promises');
const path = require('path');

const componentPathRegex = /^src\/(.*?)\/index\.ts(x)?$/;

const componentsDir = ['./src/components', './src/icons']; // components directory

async function getComponentsFilePath(src) {
	const dirents = await fs.readdir(src, { withFileTypes: true });

	let allFilesPath = await Promise.all(
		dirents.map((dirent) => {
			const res = path.join(src, dirent.name);

			if (dirent.isDirectory()) {
				return getComponentsFilePath(res);
			}
			return res;
		})
	);
	allFilesPath = Array.prototype.concat(...allFilesPath);

	const componentExportFilesPath = allFilesPath.filter(
		(filePath) => filePath.includes('index.ts') || filePath.includes('index.tsx')
	);
	return componentExportFilesPath;
}
async function getAllEntryPointsPath() {
	let res = await Promise.all(componentsDir.map((componentDir) => getComponentsFilePath(componentDir)));
	return Array.prototype.concat(...res);
}

async function getEntryObject() {
	const entryObject = {
		index: './src/exports.ts',
	};
	const componentsExportFilePaths = await getAllEntryPointsPath();

	componentsExportFilePaths.forEach((filePath) => {
		const componentPath = filePath.match(componentPathRegex)?.[1];
		componentPath && (entryObject[componentPath] = './' + filePath);
	});
	return entryObject;
}

module.exports = getEntryObject;
