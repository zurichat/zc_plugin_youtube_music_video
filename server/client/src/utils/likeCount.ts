import store from "../store";

function getLikeCount({ songId, userId }) {
  const likedSong = store.getState().likedSongs.find((e) => e.id === songId);
  const count = likedSong && likedSong.usersId ? likedSong.usersId.length : 0;
  const liked = likedSong && likedSong.usersId.some((id) => id === userId);

  return { count, liked };
}

export default getLikeCount;
