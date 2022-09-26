import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onTimeUpdate, 1000));

playFromCurrentTime();

function playFromCurrentTime() {
  const saveData = JSON.parse(localStorage.getItem(CURRENT_TIME_KEY));

  if (!saveData) {
    return;
  }

  player.setCurrentTime(saveData);
}

function onTimeUpdate(data) {
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
}
