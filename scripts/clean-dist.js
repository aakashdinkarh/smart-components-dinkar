const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'dist'); // Go up one level to the parent directory then enter 'dist'
const fileToKeep = 'index.html'; // Replace with the filename you want to keep

function deleteFolderRecursive (folderPath) {
	if (fs.existsSync(folderPath)) {
		fs.readdirSync(folderPath).forEach((file) => {
			const curPath = path.join(folderPath, file);
			if (fs.lstatSync(curPath).isDirectory()) {
				deleteFolderRecursive(curPath);
			} else {
				fs.unlinkSync(curPath);
				console.log(`Deleted file: ${curPath}`);
			}
		});
		fs.rmdirSync(folderPath);
		console.log(`Deleted folder: ${folderPath}`);
	}
}

fs.readdir(directoryPath, (err, files) => {
	if (err) {
		console.error('Error reading directory:', err);
		return;
	}

	files.forEach((file) => {
		if (file !== fileToKeep) {
			const filePath = path.join(directoryPath, file);
			if (fs.statSync(filePath).isFile()) {
				fs.unlinkSync(filePath);
				console.log(`Deleted file: ${filePath}`);
			} else {
				deleteFolderRecursive(filePath);
			}
		}
	});
});
