export function getUUID() {
  return "uu" + Date.now() + Math.round(Math.random() * 1000) + "id";
}

export function getSongIdFromYouTubeUrl(url: string) {
  const types = ["https://www.youtube.com/watch?v=", "https://youtu.be/"];

  const type = types.find((type) => url.includes(type));

  if (type) return url.replace(type, "");

  throw Error("Unsupported URL format");
}
