/* eslint-disable no-console */
const fs = require('fs/promises');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const additionalPackagesForWebsiteBuild = ["react", "react-dom", "react-router-dom"];

async function handleBuildApp ({ newPackageJson, packageJson }) {
	try {
		await fs.writeFile('package.json', JSON.stringify(newPackageJson, null, 2));
		console.log(`Added ${additionalPackagesForWebsiteBuild.join(', ')} to dependencies.`);
		
		const { stdout, stderr } = await exec('npx react-scripts build');

		console.log('stdout:', stdout);
		console.error('stderr:', stderr);
	} catch(err) {
		console.error('Something went wrong', err)
	} finally {
		await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));
		console.log(`Removed ${additionalPackagesForWebsiteBuild.join(', ')} from dependencies.`);
	}
}

// Check if the build target is set to 'website'
if (process.env.BUILD_TARGET === 'react-app') {
	(async () => {
		const fileContent = await fs.readFile('package.json', 'utf-8');
		const packageJson = JSON.parse(fileContent);
		const newPackageJson = JSON.parse(fileContent);
	
		newPackageJson.dependencies = {
			...newPackageJson.dependencies || {},
		};
	
		additionalPackagesForWebsiteBuild.forEach((packageName) => {
			newPackageJson.dependencies[packageName] = newPackageJson.devDependencies[packageName];
		})
	
		handleBuildApp({ newPackageJson, packageJson });
	})();
}
