export declare function chatData(): {
    username: string;
    id: number;
    time: string;
    imageUrl: string;
    emojis: {
        name: string;
        count: number;
        emoji: string;
    }[];
    richUiData: {
        blocks: {
            data: {};
            depth: number;
            entityRanges: any[];
            inlineStyleRanges: any[];
            key: string;
            text: string;
            type: string;
        }[];
        entityMap: {};
    };
}[];
