"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const images = express_1.default.Router();
images.get('/', (req, res) => {
    let { filename, width, height } = req.query;
    if (fs_1.default.existsSync('./assets/images/full/encenadaport.jpg')) {
        (0, sharp_1.default)('./assets/images/full/' + filename + '.jpg')
            .resize(Number(width), Number(height))
            .toFile('./assets/images/thumb/' + filename + '_thumb.jpg')
            .then((data) => {
            fs_1.default.readFile('./assets/images/thumb/' + filename + '_thumb.jpg', (err, data) => {
                if (err) {
                    throw err;
                }
                res.writeHead(200, { 'Content-Type': 'image/jpg' });
                res.send(data);
            });
        })
            .catch((err) => {
        });
    }
    else {
        res.send("Image doesn't exit.");
    }
});
exports.default = images;
