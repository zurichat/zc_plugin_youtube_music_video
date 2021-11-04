import { RootState } from './store';
export declare const updatedSongId: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, string>;
export declare const selectUpdateId: (state: RootState) => string;
declare const _default: import("redux").Reducer<{
    updateId: string;
}, import("redux").AnyAction>;
export default _default;
