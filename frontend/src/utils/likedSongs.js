import React from "react";
import store from "../store/index";

function getLikeCount(userId) {
  const likeSong = store.getState().likedSongs.find((e) => {
    if (e.id === !userId) return;
    if (e.id === userId) return e.usersId.length;
  });

  return likeSong;
}

export default getLikeCount;
