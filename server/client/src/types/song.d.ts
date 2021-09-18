import SongMetadata from "./songMetadata";

export default interface Song extends SongMetadata {
  id: string;
  addedBy: string;
}
