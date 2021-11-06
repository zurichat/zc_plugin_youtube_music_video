declare const chatService: {
    addChat: (chat: Chat) => Promise<void>;
    getChats: () => Promise<void>;
    deleteChat: (id: string) => Promise<void | {
        payload: {
            id: string;
        };
        type: string;
    }>;
};
export default chatService;
