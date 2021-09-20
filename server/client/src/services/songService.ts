import Song from "../types/song";
import log from "./logService";

import { songAction } from "../store/songsSlice";

function addSong(song: Song) {
  songAction.dispatchAddSong(song);
  log.success("Song added");
}

const object = { addSong };

export default object;
