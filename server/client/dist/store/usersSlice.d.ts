import { RootState } from ".";
import User from "../types/user";
export declare const userLogin: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, userLogout: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, updateUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export declare const selectAllUsers: (state: RootState) => User[];
export declare const selectUserById: (state: RootState, userId: string) => User;
declare const _default: import("redux").Reducer<User[], import("redux").AnyAction>;
export default _default;
