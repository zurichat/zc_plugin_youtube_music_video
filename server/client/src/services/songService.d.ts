declare const songService: {
    getSongs: () => void;
    addSong: (song: SongToAdd) => Promise<void>;
    likeSong: (like: LikeSong) => Promise<void>;
    deleteSong: (id: string) => Promise<import("axios").AxiosResponse<any>>;
};
export default songService;
