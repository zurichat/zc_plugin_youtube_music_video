import React from "react";
import configureStore from "../store/index";

function getLikeCount(userId) {
  const likeSong = configureStore.getState().likedSongs.find((e) => {
    if (e.songId === !userId) return;
    if (e.songId === userId) return e.userId.length;
  });

  return likeSong;
}

export default getLikeCount;
