import Song from "../types/song";
declare function addSong(song: Song): void;
declare const object: {
    addSong: typeof addSong;
};
export default object;
