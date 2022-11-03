import supertest from "supertest";
import app from "../index";
import sizeoF from "image-size";
import path from "path";
import resizeImage from "../jobs/resizeImage";

const request = supertest(app);

describe("Resize Image", (): void => {
  it("If the file doesn't exit, return 400 error", (): void => {
    request.get("/api/images?filename=nofile&width=200&height=270").expect(400);
  });

  it("Image has been resized successfully without send request to server", (): void => {
    resizeImage("santamonica", 200, 270).then((data) => {
      expect(data).toBeTruthy();
    });
  });
});
