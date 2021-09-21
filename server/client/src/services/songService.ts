import Song from "../types/song";
import LikeSong from "../types/likeSong";

import log from "./logService";
import { songAction } from "../store/songsSlice";
import httpService from "./httpService";

const addSong = async (song: Song) => {
  try {
    await httpService.post("/song", {
      url: song.url,
    });

    log.success("Song added");
    songAction.dispatchAddSong(song);
  } catch (error) {
    log.error(error.message);
    console.log(error.message);
  }
};

const likeSong = async (like: LikeSong) => {
  try {
    await httpService.post("/song", like);

    log.success("Song added");
  } catch (error) {
    log.error(error.message);
    console.log(error.message);
  }
};

const songService = { addSong, likeSong };

export default songService;
