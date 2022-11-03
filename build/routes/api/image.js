"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resizeImage_1 = __importDefault(require("../../jobs/resizeImage"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_cache_1 = __importDefault(require("node-cache"));
const images = express_1.default.Router();
const myCache = new node_cache_1.default();
images.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query['filename'];
    const width = req.query['width'] ? Number(req.query['width']) : null;
    const height = req.query['height'] ? Number(req.query['height']) : null;
    const thumbImageName = `${filename}-${width}-${height}`;
    const pathImg = path_1.default.resolve(__dirname, `../../../assets/images/thumb/${thumbImageName}.jpg`);
    if (!filename || !width || isNaN(width) || width < 0 || !height || isNaN(height) || height < 0) {
        res.status(400).send("Enter valid filename, width and height.");
        return;
    }
    if (!fs_1.default.existsSync("./assets/images/full/" + filename + ".jpg")) {
        res.status(400).send("Image doesn't exit.");
        return;
    }
    if (myCache.has(thumbImageName)) {
        res.status(200).end(myCache.get(thumbImageName));
        return;
    }
    if (fs_1.default.existsSync(pathImg)) {
        fs_1.default.readFile(pathImg, (err, data) => {
            if (err) {
                throw err;
            }
            myCache.set(thumbImageName, data, 3600);
            res.status(200).end(data);
        });
    }
    else {
        (0, resizeImage_1.default)(filename, width, height)
            .then((data) => {
            fs_1.default.readFile(pathImg, (err, data) => {
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
}));
exports.default = images;
