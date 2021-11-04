import { RootState } from './store';
export declare const addedChat: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Chat, string>, setChats: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Chat[], string>, failChat: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Chat, string>, removeChat: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    id: string;
}, string>, sentChat: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Chat, string>;
export declare const selectChats: (state: RootState) => Chat[];
export declare const selectChatById: (id: string) => (state: RootState) => Chat;
export declare const selectLastChat: (state: RootState) => Chat;
declare const _default: import("redux").Reducer<Chat[], import("redux").AnyAction>;
export default _default;
