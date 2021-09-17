import { RootState } from ".";
export declare const loaded: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, congratsToggled: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, toggleChat: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, addSongToggle: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export declare const selectChat: (state: RootState) => boolean;
export declare const selectPasteUrl: (state: RootState) => boolean;
declare const _default: import("redux").Reducer<{
    isLoading: boolean;
    congrats: boolean;
    showChat: boolean;
    addSong: boolean;
}, import("redux").AnyAction>;
export default _default;
