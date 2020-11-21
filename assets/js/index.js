
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

  game.canvas.addEventListener('touchstart', event => {
    event.keyCode = KEY_UP;
    onKeyEvent(event, game);
  });

  game.canvas.addEventListener('touchend', event => {
    event.keyCode = KEY_UP;
    onKeyEvent(event, game);
  });

  document.addEventListener('keydown', event => onKeyEvent(event, game));
  document.addEventListener('keyup', event => onKeyEvent(event, game));
});
