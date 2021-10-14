import { SongToAdd } from "../types/song";
import LikeSong from "../types/likeSong";

import { songDispatch } from "../store/songsSlice";
import httpService, { endpoints } from "./httpService";
import store from "../store";

const getSongs = () => {
	httpService.get(httpService.endpoints.songs).then(
		result => {
			const data = result.data.data ?? [];
			songDispatch.initialize(data.filter(song => song.url));
			return result;
		},

		error => {
			console.log(error.message);
			return [];
		}
	);
};

const addSong = async (song: SongToAdd) => {
	console.log("adding song", song);

	return httpService.post(httpService.endpoints.songs, song).then(() => {
		const { songs } = store.getState();
		songs.slice(6).forEach(({ id }) => deleteSong(id));
	});
};

const deleteSong = async (id: string) => {
	return httpService.post(endpoints.deletesong, { id }).then(res => {
		songDispatch.removeSong(id);
		return res;
	});
};

const likeSong = async (like: LikeSong) => {
	songDispatch.likeSong(like);

	try {
		await httpService.post(httpService.endpoints.likesong, like);
	} catch (error) {
		console.log(error.message);
	}
};

const songService = { getSongs, addSong, likeSong, deleteSong };

export default songService;
