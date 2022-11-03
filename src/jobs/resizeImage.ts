import sharp from "sharp";
import path from 'path';

function resizeImage(filename: string, width: number, height: number):Promise<any> {
    
    return sharp(path.resolve(__dirname, "../../assets/images/full/" + filename + ".jpg"))
    .resize(width, height)
    .toFile(path.resolve(__dirname, `../../assets/images/thumb/${filename}-${width}-${height}.jpg`));
}

export default resizeImage;