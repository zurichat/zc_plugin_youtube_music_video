import { RootState } from ".";
import Song from "../types/song";
export declare const addSong: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, removeSong: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, updateSong: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export declare const songAction: {
    dispatchAddSong: (payload: Song) => void;
    dispatchRemoveSong: (payload: Song) => void;
    dispatchUpdateSong: (payload: Song) => void;
};
export declare const selectAllSongs: (state: RootState) => Song[];
export declare const selectSongById: (state: RootState, songId: string) => Song;
declare const _default: import("redux").Reducer<Song[], import("redux").AnyAction>;
export default _default;
