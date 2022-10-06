import fs from 'fs';
import path from 'path';


const utils = {
    clearUploading: async (file: any) => {
        const filePath = path.join(__dirname, '..','..', 'uploads', file);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    },
    fileToBase64: async (file: any) => {
        const filePath = path.join(__dirname, '..','..', 'uploads', file);
        const bitmap = fs.readFileSync(filePath);
        const fileToBase64 = bitmap.toString('base64');

        return fileToBase64;
    }
}

export default utils;