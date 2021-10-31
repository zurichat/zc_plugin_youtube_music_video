export function getUUID() {
	return `uu${Date.now()}${Math.round(Math.random() * 1000)}id`;
}

export function getSongIdFromYouTubeUrl(url: string) {
	const types = [
		"https://www.youtube.com/watch?v=",
		"https://youtu.be/"
		// "https://m.youtube.com/watch?v=",
	];

	// ("https://m.youtube.com/watch?v=5YI-X5THc40&list=RDMM5YI-X5THc40&start_radio=1");

	const type = types.find(type => url.includes(type));

	if (type) return url.replace(type, ""); // KUoPz0xYEoI

	throw Error("Unsupported URL type");
}
