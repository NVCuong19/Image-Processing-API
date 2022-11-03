"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
function resizeImage(filename, width, height) {
    return (0, sharp_1.default)(path_1.default.resolve(__dirname, "../../assets/images/full/" + filename + ".jpg"))
        .resize(width, height)
        .toFile(path_1.default.resolve(__dirname, `../../assets/images/thumb/${filename}-${width}-${height}.jpg`));
}
exports.default = resizeImage;
