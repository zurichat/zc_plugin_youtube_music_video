import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  cover: '',
  duration: '',
  likes: '',
  addedBy: '',
};

const chatSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    addSong: (state, action) => {
      state.title = action.payload.title;
      state.cover = action.payload.cover;
      state.duration = action.payload.duration;
      state.likes = action.payload.likes;
      state.addedBy = action.payload.addedBy;
    },
  },
});

export const { setUserLoginDetails } = chatSlice.actions;

export const selectSongTitle = (state) => state.song.name;
export const selectSongCover = (state) => state.song.photo;
export const selectSongDuration = (state) => state.song.duration;
export const selectSongLikes = (state) => state.song.likes;
export const selectSongAddedBy = (state) => state.song.addedBy;

export default chatSlice.reducer;
