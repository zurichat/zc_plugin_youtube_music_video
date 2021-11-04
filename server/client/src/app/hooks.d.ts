import { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './store';
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<{
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
}, null, import("redux").AnyAction> & import("redux-thunk").ThunkDispatch<{
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
}, undefined, import("redux").AnyAction> & import("redux").Dispatch<import("redux").AnyAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
