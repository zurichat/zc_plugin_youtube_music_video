import axios from "axios";

import SongMetadata from "../types/songMetadata";
import { getSongIdFromYouTubeUrl } from "./idGenerator";

export async function getSongMetadat(url): Promise<SongMetadata> {
  const id = getSongIdFromYouTubeUrl(url);
  const endpoint = `https://coassist.herokuapp.com/api/metadata/${id}`;

  return axios.get(endpoint).then(
    (value) => ({
      id,
      title: value.data.title,
      albumCover: value.data.thumbnail_url,
      duration: "--:--",
      url,
    }),
    (error) => {
      throw Error(error);
    }
  );
}
