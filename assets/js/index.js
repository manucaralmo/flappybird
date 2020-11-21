
function onKeyEvent(event, game) {
  if (game.drawIntervalId) {
    game.onKeyEvent(event)
  } else {
    const startBtn = document.getElementById('restart-btn');
    startBtn.classList.toggle('hidden');
    game.restart()
  }
}

window.addEventListener('load', () => {

  const game = new Game('canvas-game', () => {
    const startBtn = document.getElementById('restart-btn');
    startBtn.classList.toggle('hidden');
  });
  game.start();

  document.addEventListener('touchstart', event => {
    event.type = 'keydown';
    event.keyCode = KEY_UP;
    onKeyEvent(event, game);
  });

  document.addEventListener('touchend', event => {
    event.type = 'keyup';
    event.keyCode = KEY_UP;
    onKeyEvent(event, game);
  });

  document.addEventListener('keydown', event => onKeyEvent(event, game));
  document.addEventListener('keyup', event => onKeyEvent(event, game));
});
