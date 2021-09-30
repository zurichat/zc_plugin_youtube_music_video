import { SongToAdd } from "../types/song";
import LikeSong from "../types/likeSong";

import { songDispatch } from "../store/songsSlice";
import httpService from "./httpService";

const { songEndpoint, likeEndpoint } = httpService.endpoints;

const getSongs = () => {
  httpService.get(songEndpoint).then(
    (result) => {
      const data = result.data.data ?? [];
      songDispatch.initialize(data.filter((song) => song.url));
      return result;
    },

    (error) => {
      console.log(error.message);
      return [];
    }
  );
};

const addSong = async (song: SongToAdd) => {
  return httpService.post(songEndpoint, song);
};

const likeSong = async (like: LikeSong) => {
  songDispatch.likeSong(like);

  try {
    await httpService.post(likeEndpoint, like);
  } catch (error) {
    console.log(error.message);
  }
};

const songService = { getSongs, addSong, likeSong, addSongbyUrl: addSong };

export default songService;
