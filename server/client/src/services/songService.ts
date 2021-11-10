import { initializedSongs } from "../app/songsSlice";
import httpService, { endpoints } from "./httpService";
import store from "../app/store";
import { toast } from "react-toastify";

const getSongs = () => {
	httpService.get(httpService.endpoints.songs).then(
		result => {
			const data = result.data.data ?? [];
			store.dispatch(initializedSongs(data.filter(song => song.url)));
			return result;
		},

		error => {
			console.log(error.message);
			return [];
		}
	);
};

const addSong = async (song: SongToAdd, cb: Callback) => {
	try {
		await httpService.post(httpService.endpoints.songs, song);
		const { songs } = store.getState();
		songs.slice(6).forEach(({ id }) => deleteSong(id));

		cb?.success && cb.success();
	} catch (error) {
		toast.error(error.message);
		console.log(error.message);
		cb?.error && cb.error();
	}
};

const deleteSong = async (id: string, cb?: Callback) => {
	try {
		await httpService.post(endpoints.deletesong, { id });

		cb?.success && cb.success();
	} catch (error) {
		console.log(error.message);
		toast.error(error.message);
		cb?.error && cb.error();
	}
};

const likeSong = async (like: LikeSong, cb: Callback) => {
	try {
		await httpService.post(httpService.endpoints.likesong, like);

		cb?.success && cb.success();
	} catch (error) {
		console.log(error.message);
		cb?.error && cb.error();
	}
};

const songService = { getSongs, addSong, likeSong, deleteSong };

export default songService;
