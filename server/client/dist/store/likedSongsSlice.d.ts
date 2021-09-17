import { RootState } from ".";
import LikedSong from "../types/likedSong";
export declare const likeSong: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, unlikeSong: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export declare const selectAllLikedSongs: (state: RootState) => any;
export declare const selectLikedSongById: (state: RootState, likedSongId: string) => any;
declare const _default: import("redux").Reducer<LikedSong[], import("redux").AnyAction>;
export default _default;
