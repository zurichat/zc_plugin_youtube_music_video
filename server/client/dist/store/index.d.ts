declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    users: import("../types/user").default[];
    chats: {
        id: string;
        userId: string;
        name: string;
        time: number;
        message: string;
        avatar: string;
    }[];
    songs: import("../types/song").default[];
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
    chats: {
        id: string;
        userId: string;
        name: string;
        time: number;
        message: string;
        avatar: string;
    }[];
    songs: import("../types/song").default[];
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
    chats: {
        id: string;
        userId: string;
        name: string;
        time: number;
        message: string;
        avatar: string;
    }[];
    songs: import("../types/song").default[];
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
