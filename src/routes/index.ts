import express, {Request, Response} from "express";
import images from "./api/image";

const routes = express.Router();

routes.get("/", (req: Request, res: Response): void => {
  res.send("main api route");
});

routes.use("/images", images);

export default routes;
