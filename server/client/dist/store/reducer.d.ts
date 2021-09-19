declare const reducer: {
    users: import("redux").Reducer<import("../types/user").default[], import("redux").AnyAction>;
    chats: import("redux").Reducer<{
        id: string;
        userId: string;
        name: string;
        time: number;
        message: string;
        avatar: string;
    }[], import("redux").AnyAction>;
    songs: import("redux").Reducer<import("../types/song").default[], import("redux").AnyAction>;
    likedSongs: import("redux").Reducer<import("../types/likedSong").default[], import("redux").AnyAction>;
    ui: import("redux").Reducer<{
        isLoading: boolean;
        congrats: boolean;
        showChat: boolean;
        addSong: boolean;
    }, import("redux").AnyAction>;
    player: import("redux").Reducer<{
        playing: boolean;
        show: boolean;
    }, import("redux").AnyAction>;
};
export default reducer;
