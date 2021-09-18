declare function getCurrentUser(): void;
declare const authObject: {
    getCurrentUser: typeof getCurrentUser;
};
export default authObject;
