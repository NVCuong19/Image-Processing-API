"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const resizeImage_1 = __importDefault(require("../jobs/resizeImage"));
const request = (0, supertest_1.default)(index_1.default);
describe("Resize Image", () => {
    it("If the file doesn't exit, return 400 error", () => {
        request.get("/api/images?filename=nofile&width=200&height=270").expect(400);
    });
    it("Image has been resized successfully without send request to server", () => {
        (0, resizeImage_1.default)("santamonica", 200, 270).then((data) => {
            expect(data).toBeTruthy();
        });
    });
});
