import axios from "axios";
import { getSongIdFromYouTubeUrl } from "./idGenerator";

export async function getSongMetadat(url): Promise<SongMetadata> {
	// https://www.youtube.com/watch?v=KUoPz0xYEoI
	const id = getSongIdFromYouTubeUrl(url);

	const endpoint = `https://coassist.herokuapp.com/api/metadata/${id}`;

	return axios.get(endpoint).then(
		value => ({
			id,
			title: value.data.title,
			albumCover: value.data.thumbnail_url,
			duration: "--:--",
			url
		}),

		error => {
			throw Error(error);
		}
	);
}
