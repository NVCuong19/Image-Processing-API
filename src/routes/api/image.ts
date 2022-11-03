import express, {Request, Response} from "express";
import resizeImage from "../../jobs/resizeImage";
import fs from "fs";
import path from 'path';
import NodeCache from "node-cache";

const images = express.Router();
const myCache = new NodeCache();

images.get("/", async (req: Request, res: Response): Promise<any> => {
  const filename: string = req.query['filename'] as string;
  const width: number | null = req.query['width'] ? Number(req.query['width']): null;
  const height: number | null = req.query['height'] ? Number(req.query['height']): null;

  const thumbImageName = `${filename}-${width}-${height}`;
  const pathImg = path.resolve(__dirname, `../../../assets/images/thumb/${thumbImageName}.jpg`);

  if(!filename || !width || isNaN(width) || width < 0 || !height || isNaN(height) || height < 0) {
    res.status(400).send("Enter valid filename, width and height.");
    return;
  }

  if (!fs.existsSync("./assets/images/full/" + filename + ".jpg")) {
    res.status(400).send("Image doesn't exit.");
    return;
  }

  if (myCache.has(thumbImageName)) {
    res.status(200).end(myCache.get(thumbImageName));
    return;
  }

  if (fs.existsSync(pathImg)) {
    fs.readFile(pathImg, (err, data) => {
      if (err) {
        throw err;
      }

      myCache.set(thumbImageName, data, 3600);
      res.status(200).end(data);
    });
  } else {
    resizeImage(filename, width, height)
      .then((data) => {
        fs.readFile(pathImg, (err, data) => {
          if (err) {
            throw err;
          }
          myCache.set(thumbImageName, data, 3600);
          res.status(200).end(data);
        });
      })
      .catch((err) => {
        res.status(400).send("Server Error!");
      });
  }
});

export default images;
