import youtube from "youtube-metadata-from-url";
import SongMetadata from "../types/songMetadata";

export async function getSongMetadat(url): Promise<SongMetadata> {
  return youtube.getMetadata(url).then((result) => ({
    title: result.title,
    albumCover: result.thumbnail_url,
    duration: "--",
  }));
}
