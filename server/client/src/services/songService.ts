import Song from "../types/song";
import { toast } from "react-toastify";

import { songAction } from "../store/songsSlice";

function addSong(song: Song) {
  songAction.dispatchAddSong(song);
  toast("Song added");
}

const object = { addSong };

export default object;
