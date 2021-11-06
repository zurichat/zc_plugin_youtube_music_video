import { ThunkAction, Action } from "@reduxjs/toolkit";
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    users: {
        currentUser: User;
        isMember: boolean;
        users: User[];
    };
    chats: Chat[];
    songs: Song[];
    ui: {
        isLoading: boolean;
        showChat: boolean;
        showPasteUrl: boolean;
        showModal: boolean;
        exitModal: boolean;
        showMemberList: boolean;
        showDeleteModal: boolean;
        enterModal: boolean;
    };
    player: {
        playing: boolean;
        show: boolean;
        currentSongId: string;
    };
    delete: {
        updateId: string;
    };
}, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<{
    users: {
        currentUser: User;
        isMember: boolean;
        users: User[];
    };
    chats: Chat[];
    songs: Song[];
    ui: {
        isLoading: boolean;
        showChat: boolean;
        showPasteUrl: boolean;
        showModal: boolean;
        exitModal: boolean;
        showMemberList: boolean;
        showDeleteModal: boolean;
        enterModal: boolean;
    };
    player: {
        playing: boolean;
        show: boolean;
        currentSongId: string;
    };
    delete: {
        updateId: string;
    };
}, import("redux").AnyAction, null> | import("redux-thunk").ThunkMiddleware<{
    users: {
        currentUser: User;
        isMember: boolean;
        users: User[];
    };
    chats: Chat[];
    songs: Song[];
    ui: {
        isLoading: boolean;
        showChat: boolean;
        showPasteUrl: boolean;
        showModal: boolean;
        exitModal: boolean;
        showMemberList: boolean;
        showDeleteModal: boolean;
        enterModal: boolean;
    };
    player: {
        playing: boolean;
        show: boolean;
        currentSongId: string;
    };
    delete: {
        updateId: string;
    };
}, import("redux").AnyAction, undefined>]>;
export declare type AppDispatch = typeof store.dispatch;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
