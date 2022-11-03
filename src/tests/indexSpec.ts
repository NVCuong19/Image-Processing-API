import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint response", (): void => {
  it("gets the api/images endpoint", () => {
    request.get("/api").expect(200);
  });
});
