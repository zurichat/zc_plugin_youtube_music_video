import SongMetadata from "./songMetadata";

export default interface Song extends SongMetadata {
  addedBy: string;
}
