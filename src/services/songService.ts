import multer from 'multer';
import azureBlobUtils from "../Utils/azureBlobUtils";
import jsmediatags from 'jsmediatags';
import { CreateSong } from '../types/songTypes';
import songRepository from '../repositories/songRepository';

const songService = {
    getSong: async (id: string) => {
        const song = await songRepository.getSong(id);

        if(!song) {
            throw {type: 'not_found', message: 'Song not found'};
        }

        return song;
    },
    uploadSong: async (userId: number, file: any) => {
        const filePath = file?.path;
        const blobUrl = await azureBlobUtils.uploadToBlob(file);
        new jsmediatags.Reader(filePath).read({
            onSuccess: async function(tag) {
                const picture = tag.tags.picture?.data || " ";
                const cover = Buffer.from(picture).toString('base64');
                const song: CreateSong = {
                    title: tag.tags.title || file?.originalname,
                    artist: tag.tags.artist|| "unknown",
                    album: tag.tags.album|| "unknown",
                    year: tag.tags.year || "unknown",
                    genre: tag.tags.genre || "unknown",
                    cover: cover,
                    blobId: file?.originalname,
                    blobUrl: blobUrl,
                    createdAt: new Date(),
                    userId: userId
                }
                await songRepository.saveSong(song);
            },
            onError: function(error) {
              console.log(':(', error.type, error.info);
            }
        });
    }
}

export default songService;