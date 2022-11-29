import { Router } from "express";
import validateJWT from "../middlewares/validateJwtMiddleware";

const TestRouter = Router();

TestRouter.get("/test", validateJWT, (req, res) => {
    res.send("Hello World!");
});

export default TestRouter;