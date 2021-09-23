export default interface Song {
  id: string;
  title: string;
  duration: string;
  albumCover: string;
  url: string;
  addedBy: string;
  likedBy: string[]; // an array of userIds who have liked this song.
}
