import { pluginHeader } from "@zuri/plugin-header";
export { pluginHeader };
export declare const headerConfig: (members: User[], cb: any) => {
    name: string;
    icon: string;
    userCount: number;
    thumbnailUrl: string[];
    hasThumbnail: boolean;
    roomInfo: {
        membersList: {
            _id: string;
            email: string;
        }[];
        addmembersevent: (values: any) => void;
        removememberevent: (id: any) => void;
    };
};
