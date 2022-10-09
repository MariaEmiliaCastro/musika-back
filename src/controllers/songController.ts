import { Request, Response } from "express";
import multer from 'multer';
import songService from "../services/songService";
import azureBlobUtils from "../Utils/azureBlobUtils";
import utils from "../Utils/utils";
import path from 'path';

const upload = multer({ dest: 'uploads/' })

const SongController = {
    getSong: async (req: Request, res: Response) => {
        const id = req.params.id;
        const songData = await songService.getSong(id);

        res.send(songData);
    },
    uploadSong: async (req: Request, res: Response) => {
        const file = req.file;
        const userId = res.locals.id;
        
        songService.checkSongFile(file);
        await songService.uploadSong(userId, file);

        //await utils.clearUploading(file?.filename);

        res.sendStatus(200);
    },
    getAllSongsForUser: async (req: Request, res: Response) => {
        const userId = res.locals.id;
        const songs = await songService.getAllSongsForUser(userId);
        res.status(200).send(songs);
    }
}

export default SongController;