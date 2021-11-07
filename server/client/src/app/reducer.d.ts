declare const reducer: {
    users: import("redux").Reducer<{
        currentUser: User;
        isMember: boolean;
        users: User[];
    }, import("redux").AnyAction>;
    chats: import("redux").Reducer<Chat[], import("redux").AnyAction>;
    songs: import("redux").Reducer<Song[], import("redux").AnyAction>;
    ui: import("redux").Reducer<{
        isLoading: boolean;
        showChat: boolean;
        showPasteUrl: boolean;
        showModal: boolean;
        exitModal: boolean;
        showMemberList: boolean;
        showDeleteModal: boolean;
        enterModal: boolean;
    }, import("redux").AnyAction>;
    player: import("redux").Reducer<{
        playing: boolean;
        show: boolean;
        currentSongId: string;
    }, import("redux").AnyAction>;
    delete: import("redux").Reducer<{
        updateId: string;
    }, import("redux").AnyAction>;
};
export default reducer;
