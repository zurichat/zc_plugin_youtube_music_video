import { initializedSongs, likedSong, removedSong } from "../app/songsSlice";
import httpService, { endpoints } from "./httpService";
import store from "../app/store";

const dispatch = store.dispatch;

const getSongs = () => {
	httpService.get(httpService.endpoints.songs).then(
		result => {
			const data = result.data.data ?? [];
			dispatch(initializedSongs(data.filter(song => song.url)));
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
		dispatch(removedSong({ id }));
		return res;
	});
};

const likeSong = async (like: LikeSong) => {
	dispatch(likedSong(like));

	try {
		await httpService.post(httpService.endpoints.likesong, like);
	} catch (error) {
		console.log(error.message);
	}
};

const songService = { getSongs, addSong, likeSong, deleteSong };

export default songService;
