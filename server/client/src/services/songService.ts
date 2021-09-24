import Song from "../types/song";
import LikeSong from "../types/likeSong";

import log from "./logService";
import { songDispatch } from "../store/songsSlice";
import httpService from "./httpService";

const addSong = async (song: Song) => {
  try {
    await httpService.post("/song", {
      url: song.url,
    });

    log.success("Song added");
  } catch (error) {
    // log.error(error.message);
    console.log(error.message);
  }
  songDispatch.addSong(song);
};

const likeSong = async (like: LikeSong) => {
  songDispatch.likeSong(like);

  try {
    await httpService.post("/like", like);

    log.success("User liked a song");
  } catch (error) {
    // log.error(error.message);
    console.log(error.message);
  }
};

const songService = { addSong, likeSong };

export default songService;
