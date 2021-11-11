import httpService from "./httpService";
import log from "./logService";

const getSongs = () => {
	return httpService.get(httpService.endpoints.songs).then(
		result => (result.data.data ?? []) as Song[],
		error => {
			log.error(error);
			return [] as Song[];
		}
	);
};

const addSong = async (song: SongToAdd, cb: Callback) => {
	try {
		const { post, endpoints } = httpService;

		const { data } = await post(endpoints.songs, song);

		cb?.success && cb.success(data);
	} catch (error) {
		log.error(error);
		cb?.error && cb.error();
	}
};

const deleteSong = async (id: string, cb?: Callback) => {
	try {
		const { post, endpoints } = httpService;

		await post(endpoints.deletesong, { _id: id });

		cb?.success && cb.success();
	} catch (error) {
		log.error(error);
		cb?.error && cb.error();
	}
};

const likeSong = async (like: LikeSong, cb: Callback) => {
	try {
		const { post, endpoints } = httpService;

		const { songId, userId } = like;
		await post(endpoints.likesong, {
			songId,
			userId
		});

		cb?.success && cb.success();
	} catch (error) {
		log.error(error);
		cb?.error && cb.error();
	}
};

const songService = { getSongs, addSong, likeSong, deleteSong };

export default songService;
