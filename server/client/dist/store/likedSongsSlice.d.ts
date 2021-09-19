import { RootState } from ".";
import LikedSong from "../types/likedSong";
import LikeSong from "../types/likeSong";
export declare const likedSongDisptach: {
    toggleLike: (payload: LikeSong) => void;
};
export declare const likedSongSelect: {
    allLikedSongs: (state: RootState) => LikedSong[];
    likedSongById: (songId: string) => (state: RootState) => LikedSong;
    selectCount: ({ songId, userId }: LikeSong) => (state: RootState) => {
        count: number;
        liked: boolean;
    };
};
declare const _default: import("redux").Reducer<LikedSong[], import("redux").AnyAction>;
export default _default;
