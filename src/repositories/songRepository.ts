import { prisma } from "../config/database";
import { CreateSong } from "../types/songTypes";


const songRepository = {
    saveSong: async (song: CreateSong) => {
        await prisma.song.create({
            data: song
        })
    },
    getSong: async (id: string) => {
        return await prisma.song.findUnique({
            where: {
                id: parseInt(id)
            }
        })
    }
}

export default songRepository;