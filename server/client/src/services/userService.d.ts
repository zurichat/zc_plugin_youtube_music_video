declare function getCurrentUser(): Promise<User>;
declare function getWorkspaceUsers(): Promise<User[]>;
declare function addMember(ids?: string[]): Promise<import("axios").AxiosResponse<any>>;
declare function removeMember(id: string, name?: string): Promise<void>;
declare function getMembers(workspaceUsers?: User[]): Promise<User[]>;
declare function isMember(): Promise<boolean>;
declare const userService: {
    addMember: typeof addMember;
    removeMember: typeof removeMember;
    getCurrentUser: typeof getCurrentUser;
    getMembers: typeof getMembers;
    getWorkspaceUsers: typeof getWorkspaceUsers;
    isMember: typeof isMember;
};
export default userService;
