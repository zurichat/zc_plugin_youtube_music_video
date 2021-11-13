export const d = 3; // export or import is definitely needed

declare global {
	interface SortParam {
		property: "title" | "time" | "";
		label: string;
		order: "asc" | "des";
	}

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
		likedBy: string[]; // an array of userIds who have liked this song.
		time: string; // time in milliseconds
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
		time: number; // date in milliseconds
		name: string;
		notSent?: boolean;
		failed?: boolean;
		avatar: string;
	}

	interface ChatN {
		username: string;
		id: number;
		time: string;
		imageUrl: string;
		emojies: { name: string; count: number; emoji: string }[];
		richUiData: {
			blocks: {
				data: {};
				depth: number;
				entityRanges: [];
				inlineStyleRanges: [];
				key: string;
				text: string;
				type: string;
			}[];
			entityMap: {};
		};
	}

	interface User {
		id: string;
		name: string;
		avatar: string;
		email: string;
	}

	interface Callback {
		success?: (value?: any) => void;
		error?: () => void;
	}
}
