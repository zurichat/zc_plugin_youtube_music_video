import { RootState } from "./store";
export declare const changedPlaying: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, string>, showedPlayer: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, string>, changedCurrentSong: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    id: string;
}, string>;
export declare const getPlayerState: (state: RootState) => {
    playing: boolean;
    show: boolean;
    currentSongId: string;
};
export declare const selectCurrentSong: (state: RootState) => Song;
declare const _default: import("redux").Reducer<{
    playing: boolean;
    show: boolean;
    currentSongId: string;
}, import("redux").AnyAction>;
export default _default;
