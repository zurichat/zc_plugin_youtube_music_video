import { SongToAdd } from "../types/song";
import LikeSong from "../types/likeSong";

import { songDispatch } from "../store/songsSlice";
import httpService, { endpoints } from "./httpService";
import store from "../store";

const { songEndpoint, likeEndpoint } = endpoints;

const getSongs = () => {
  httpService.get(songEndpoint).then(
    (result) => {
      const data = result.data.data ?? [];
      // data.forEach((song) => deleteSong(song.id));
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
  return httpService.post(songEndpoint, song).then(() => {
    const { songs } = store.getState();
    if (songs.length >= 10) deleteSong(songs[songs.length - 1].id);
  });
};

const deleteSong = async (id: string) => {
  return httpService
    .post(endpoints.deleteSong, { id })
    .then(() => songDispatch.removeSong(id));
};

const likeSong = async (like: LikeSong) => {
  songDispatch.likeSong(like);

  try {
    await httpService.post(likeEndpoint, like);
  } catch (error) {
    console.log(error.message);
  }
};

const songService = { getSongs, addSong, likeSong, deleteSong };

export default songService;
