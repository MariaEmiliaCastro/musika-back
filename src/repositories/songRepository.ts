import { prisma } from "../config/database";
import { CreateSong } from "../types/songTypes";
import utils from "../Utils/utils";


const songRepository = {
    saveSong: async (song: CreateSong) => {
        await prisma.song.create({
            data: song
        })

        utils.clearUploading(song.blobId);
    },
    getSong: async (id: string) => {
        return await prisma.song.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    },
    getAllSongsForUser: async (userId: number) => {
        return await prisma.song.findMany({
            where: {
                userId: userId
            }
        })
    }
}

export default songRepository;