import { Song } from "@prisma/client";

export type CreateSong = Omit<Song, "id">;

