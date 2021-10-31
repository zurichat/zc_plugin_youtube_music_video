const to2Digits = (num: number, str: string) =>
	num === 0 ? "" : num < 10 ? `0${num} ${str}` : `${num} ${str}`;

export const totalDuration = (songs: Song[]) => {
	const totalMs = songs.reduce((acc, song) => {
		const [h, m, s] = song.duration.split(":");
		return acc + (+h * 3.6e6 + +m * 60000 + +s * 1000);
	}, 0);

	const s = (totalMs * 0.001) % 60;
	const m = Math.floor((totalMs * 1.6667e-5) % 60);
	const h = Math.floor(totalMs * 2.7778e-7);

	return `${to2Digits(h, "hr ")}${to2Digits(m, "min ")}${to2Digits(s, "sec")} `;
};
