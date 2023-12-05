import { Injectable } from '@nestjs/common';
import * as path from "path"
import * as fs from "fs"

@Injectable()
export class FilesService {

	fileToWebp(image: any) {
		const newFileName: string = `${image.filename}.webp`;
		const newFilePath: string = path.join(path.dirname(image.path), newFileName);
		fs.renameSync(image.path, newFilePath);
		image.path = newFilePath;
		return image.path
	}

	updateFile(oldImagePath: string, newImagePath: string) {
		if (fs.existsSync(oldImagePath)) {
			fs.unlinkSync(oldImagePath);
		}
		if (fs.existsSync(newImagePath)) {
			fs.renameSync(newImagePath, oldImagePath);
			return true;
		} else {
			console.log(`New file not found: ${newImagePath}`);
			return false;
		}
	}
}