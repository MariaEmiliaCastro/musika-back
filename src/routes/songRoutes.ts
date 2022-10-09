import { Router } from "express";
import SongController from "../controllers/songController";
import upload from "../middlewares/fileManagementMiddleware";
import validateJWT from "../middlewares/validateJwtMiddleware";

const SongRouter = Router();

SongRouter.post("/song", validateJWT, upload.single('song'), SongController.uploadSong);
SongRouter.get("/song/:id", validateJWT, SongController.getSong);
SongRouter.get("/song", validateJWT, SongController.getAllSongsForUser);

export default SongRouter;