import Song from "../types/song";
import LikeSong from "../types/likeSong";

import log from "./logService";
import { songDispatch } from "../store/songsSlice";
import httpService from "./httpService";

const { songEndpoint, likeEndpoint } = httpService.endpoints;

const getSongs = () => {
  httpService.get(songEndpoint).then(
    (result) => {
      const data = result.data.data ?? [];
      songDispatch.initialize(data);
      return result;
    },

    (error) => {
      console.log(error.message);
      return [];
    }
  );
};

const addSongbyUrl = async (url: string) => {
  return httpService
    .post(songEndpoint, {
      url,
    })
    .then(
      (result) => result,
      (error) => console.log(error)
    );
};

const addSong = async (song: Song) => {
  try {
    await httpService.post(songEndpoint, {
      url: song.url,
    });

    log.success("Song added");
  } catch (error) {
    console.log(error.message);
  }

  songDispatch.addSong(song);
  return;
};

const likeSong = async (like: LikeSong) => {
  songDispatch.likeSong(like);

  try {
    await httpService.post(likeEndpoint, like);

    log.success("User liked a song");
  } catch (error) {
    // log.error(error.message);
    console.log(error.message);
  }
};

const songService = { getSongs, addSong, likeSong, addSongbyUrl };

export default songService;
