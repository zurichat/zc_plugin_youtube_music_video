// convert secondes to HH:MM:SS

function formatTime(val) {
  let numInSec = parseInt(val, 10);
  let toHours = Math.floor(numInSec / 3600);
  let toMinutes = Math.floor((numInSec - toHours * 3600) / 60);
  let toSeconds = numInSec - toHours * 3600 - toMinutes * 60;

  if (toHours < 1) {
    toHours = ``;
  } else if (toHours > 1 && toHours < 10) {
    toHours = `0${toHours}:`;
  } else {
    toHours = `${toHours}:`;
  }

  if (toMinutes < 10) {
    toMinutes = `0${toMinutes}:`;
  } else {
    toMinutes = `${toMinutes}:`;
  }

  if (toSeconds < 10) {
    toSeconds = `0${toSeconds}`;
  }
  return `${toHours}${toMinutes}${toSeconds}`;
}

export { formatTime };
