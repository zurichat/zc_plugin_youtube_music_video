import React from 'react';
import store from '../store/index';

function getLikeCount(userId) {
  return store.getState().likedSongs.find(e => e.id === userId).usersId.length;
}

export default getLikeCount;