import Song from "../types/song";

const to2Digits = (num: number, str: string) =>
  num === 0 ? "" : num < 10 ? `0${num} ${str}` : `${num} ${str}`;

export const totalDuration = (songs: Song[]) => {
  const duration = { h: 0, m: 0, s: 0 };

  songs.forEach((song) => {
    const [h, m, s] = song.duration.split(":");

    duration.h = duration.h + +h;
    duration.m = duration.m + +m;
    duration.s = duration.s + +s;
  });

  const sr = duration.s % 60;
  duration.s = Math.round(duration.s / 60);

  const mr = (duration.m + sr) % 60;
  duration.m = Math.round((duration.m + sr) / 60);

  duration.h = Math.round(duration.h + mr);

  const { h: hf, m: mf, s: sf } = duration;

  return `${to2Digits(hf, "hr ")}${to2Digits(mf, "min ")}${to2Digits(
    sf,
    "sec"
  )} `;
};
