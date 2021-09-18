import SongMetadata from "../types/songMetadata";

export async function getSongMetadat(url): Promise<SongMetadata> {
  return {
    title: "title",
    albumCover:
      "https://i0.wp.com/liveforlivemusic.com/wp-content/uploads/2016/02/musicbrain.jpg?resize=610%2C390&ssl=1",
    duration: "--",
  };
}
