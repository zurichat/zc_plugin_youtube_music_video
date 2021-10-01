export default interface Song extends SongToAdd {
  id: string;
  title: string;
  duration: string;
  albumCover: string;
}

export interface SongToAdd {
  url: string;
  addedBy: string;
  userId: string;
  likedBy: string[]; // an array of userIds who have liked this song.
}
