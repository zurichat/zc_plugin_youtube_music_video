import { RootState } from './store';
export declare const setCurrentUser: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<User, string>, addedUser: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<User, string>, setUsers: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<User[], string>, removedUser: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    id: string;
}, string>, setMembership: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, string>;
export declare const selectCurrentUser: (state: RootState) => User;
export declare const selectUserList: (state: RootState) => User[];
export declare const selectUserById: (id: string) => (state: RootState) => User;
export declare const selectUserCount: (state: RootState) => number;
export declare const selectIsMember: (state: RootState) => boolean;
export declare const selectAllUsers: (state: RootState) => {
    currentUser: User;
    isMember: boolean;
    users: User[];
};
declare const _default: import("redux").Reducer<{
    currentUser: User;
    isMember: boolean;
    users: User[];
}, import("redux").AnyAction>;
export default _default;
