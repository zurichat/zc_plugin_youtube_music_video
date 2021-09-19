import { RootState } from ".";
export declare const addChat: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, removeChat: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, updateChat: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export declare const selectAllChats: (state: RootState) => {
    id: string;
    userId: string;
    name: string;
    time: number;
    message: string;
    avatar: string;
}[];
export declare const selectChatById: (state: RootState, chatId: string) => {
    id: string;
    userId: string;
    name: string;
    time: number;
    message: string;
    avatar: string;
};
declare const _default: import("redux").Reducer<{
    id: string;
    userId: string;
    name: string;
    time: number;
    message: string;
    avatar: string;
}[], import("redux").AnyAction>;
export default _default;
