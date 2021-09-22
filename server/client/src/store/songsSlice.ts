import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";
import LikeSong from "../types/likeSong";

import Song from "../types/song";

const songsSlice = createSlice({
  name: "songs",
  initialState: getMockData(),
  // initialState: [] as Song[],

  reducers: {
    addSong: (state, { payload }: PayloadAction<Song>) => {
      state.unshift(payload);
    },

    removeSong: (state, { payload }) => {
      state.filter((song) => song.id !== payload.id);
    },

    likeSong: (state, { payload }: PayloadAction<LikeSong>) => {
      const { like, songId, userId } = payload;

      const index = state.findIndex((song) => song.id === songId);

      if (index === -1) return state;

      const song = state[index];

      if (like) song.likedBy.push(userId);
      else song.likedBy = song.likedBy.filter((id) => id !== userId);

      state[index] = song;
    },
  },
});

export const { addSong, removeSong, likeSong } = songsSlice.actions;

export const songDispatch = {
  addSong: (payload: Song) => {
    store.dispatch({ type: addSong.type, payload });
  },

  removeSong: (payload: Song) => {
    store.dispatch({ type: removeSong.type, payload: { id: payload.id } });
  },

  likeSong: (payload: LikeSong) => {
    store.dispatch({ type: likeSong.type, payload });
  },
};

export const songSelect = {
  allSongs: (state: RootState) => state.songs,

  songById: (songId: string) => (state: RootState) => {
    return state.songs.find((song) => song.id === songId);
  },

  firstSong: (state: RootState) => state.songs[0],

  like_count:
    ({ songId, userId }: { songId: string; userId: string }) =>
    (state: RootState) => {
      const song = state.songs.find((song) => song.id === songId);

      if (!song) return { count: 0, liked: false };

      return {
        count: song.likedBy.length,
        liked: song.likedBy.some((id) => id === userId),
      };
    },
};

export default songsSlice.reducer;

function getMockData() {
  const mock: Song[] = [
    {
      title: "Came to My Rescue - Emmy Rose",
      id: "mC-5AyfwMoI",
      url: "https://youtu.be/mC-5AyfwMoI",
      albumCover: "https://i.ytimg.com/vi/mC-5AyfwMoI/hqdefault.jpg",
      addedBy: "Justiz",
      duration: "--:--",

      likedBy: [],
    },
    {
      title: "When You Were A Child (Live) - Jason Upton",
      id: "rbWBYs_7kCA",
      url: "https://www.youtube.com/watch?v=rbWBYs_7kCA",
      albumCover: "https://i.ytimg.com/vi/rbWBYs_7kCA/hqdefault.jpg",
      addedBy: "Justiz",
      duration: "--:--",
      likedBy: [],
    },
    {
      id: "VFmQEqDLP2k",
      title: "Jason Upton - Freedom Reigns",
      url: "https://youtu.be/VFmQEqDLP2k",
      albumCover: "https://i.ytimg.com/vi/VFmQEqDLP2k/hqdefault.jpg",
      addedBy: "Justiz",
      duration: "--:--",
      likedBy: [],
    },
  ];

  return mock;
}
