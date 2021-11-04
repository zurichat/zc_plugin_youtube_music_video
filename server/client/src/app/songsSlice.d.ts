import { RootState } from "./store";
export declare const addedSong: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Song, string>, removedSong: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    id: string;
}, string>, likedSong: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<LikeSong, string>, initializedSongs: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Song[], string>;
export declare const selectSongs: (state: RootState) => Song[];
export declare const selectSongById: (songId: string) => (state: RootState) => Song;
export declare const selectSongByUrl: (url: string) => (state: RootState) => Song;
export declare const selectFirstSong: (state: RootState) => Song;
export declare const selectLikeCount: ({ songId, userId }: {
    songId: string;
    userId: string;
}) => (state: RootState) => {
    count: number;
    liked: boolean;
};
declare const _default: import("redux").Reducer<Song[], import("redux").AnyAction>;
export default _default;
