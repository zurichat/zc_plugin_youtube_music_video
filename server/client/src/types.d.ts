export declare const d = 3;
declare global {
    interface Song extends SongToAdd {
        id: string;
        title: string;
        duration: string;
        albumCover: string;
    }
    export interface SongToAdd {
        url: string;
        addedBy: string;
        userId: string;
        likedBy: string[];
        time: string;
    }
    interface SongMetadata {
        id: string;
        duration: string;
        title: string;
        albumCover: string;
        url: string;
    }
    interface AddSong {
        url: string;
        username: string;
    }
    interface LikeSong {
        userId: string;
        songId: string;
        like?: boolean;
    }
    interface Chat {
        id: string;
        message: string;
        userId: string;
        time: number;
        name: string;
        notSent?: boolean;
        failed?: boolean;
        avatar: string;
    }
    interface User {
        id: string;
        name: string;
        avatar: string;
        email: string;
    }
}
