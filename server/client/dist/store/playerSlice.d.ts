import { RootState } from ".";
export declare const playing: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, showPlayer: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export declare const getPlayerState: (state: RootState) => {
    playing: boolean;
    show: boolean;
};
declare const _default: import("redux").Reducer<{
    playing: boolean;
    show: boolean;
}, import("redux").AnyAction>;
export default _default;
