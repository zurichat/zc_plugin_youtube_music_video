import { RootState } from ".";
export declare const addSong: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, removeSong: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, updateSong: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export declare const selectAllSongs: (state: RootState) => any;
export declare const selectSongById: (state: RootState, songId: string) => any;
declare const _default: import("redux").Reducer<any, import("redux").AnyAction>;
export default _default;
