import React from "react";
import configureStore from "../../store/index";

function userLikedSong(id) {
  const list = configureStore.getState.likedSongs.id;
  console.log(list);

  return <div></div>;
}

export default userLikedSong;
