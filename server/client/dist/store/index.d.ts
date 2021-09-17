declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    users: import("../types/user").default[];
    chats: any;
    songs: any;
    likedSongs: import("../types/likedSong").default[];
    ui: {
        isLoading: boolean;
        congrats: boolean;
        showChat: boolean;
        addSong: boolean;
    };
    player: {
        playing: boolean;
        show: boolean;
    };
}, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<{
    users: import("../types/user").default[];
    chats: any;
    songs: any;
    likedSongs: import("../types/likedSong").default[];
    ui: {
        isLoading: boolean;
        congrats: boolean;
        showChat: boolean;
        addSong: boolean;
    };
    player: {
        playing: boolean;
        show: boolean;
    };
}, import("redux").AnyAction, null> | import("redux-thunk").ThunkMiddleware<{
    users: import("../types/user").default[];
    chats: any;
    songs: any;
    likedSongs: import("../types/likedSong").default[];
    ui: {
        isLoading: boolean;
        congrats: boolean;
        showChat: boolean;
        addSong: boolean;
    };
    player: {
        playing: boolean;
        show: boolean;
    };
}, import("redux").AnyAction, undefined>]>;
export declare type RootState = ReturnType<typeof store.getState>;
export default store;
