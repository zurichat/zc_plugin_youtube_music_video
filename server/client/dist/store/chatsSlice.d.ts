import { RootState } from ".";
export declare const addChat: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, removeChat: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, updateChat: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export declare const selectAllChats: (state: RootState) => any;
export declare const selectChatById: (state: RootState, chatId: string) => any;
declare const _default: import("redux").Reducer<any, import("redux").AnyAction>;
export default _default;
