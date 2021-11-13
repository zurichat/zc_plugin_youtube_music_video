const to2Digits = (num: number, str: string) =>
	num === 0 ? "" : num < 10 ? `0${num} ${str}` : `${num} ${str}`;

export const totalDuration = (songs: Song[]) => {
	const total_ms = songs.reduce((acc, song) => {
		const [h, m, s] = song.duration.split(":");
		return acc + (+h * 3.6e6 + +m * 60000 + +s * 1000);
	}, 0);

	const s = (total_ms * 0.001) % 60;
	const m = Math.floor((total_ms * 1.6667e-5) % 60);
	const h = Math.floor(total_ms * 2.7778e-7);

	return `${to2Digits(h, "hr ")}${to2Digits(m, "min ")}${to2Digits(s, "sec")} `;
};

export const sortByTitle = (songs: Song[], order: "asc" | "des") => {
	return order === "asc"
		? songs.sort((a, b) => a.title.localeCompare(b.title))
		: songs.sort((a, b) => b.title.localeCompare(a.title));
};

export const sortByTime = (songs: Song[], order: "asc" | "des") => {
	try {
		const getTime = (time: number) => new Date(time).getTime();

		return order === "asc"
			? songs.sort((a, b) => getTime(+a.time) - getTime(+b.time))
			: songs.sort((a, b) => getTime(+b.time) - getTime(+a.time));
	} catch (error) {
		console.log(error.message, "util/sortByTime, line 31");
		return songs;
	}
};
