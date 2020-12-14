window.addEventListener('load', () => {
  const game = new Game('canvas-game')
  game.start()

  // ====================================
  // Computer / Laptops
  // ====================================

  document.addEventListener('keydown', event => {
    game.onKeyEvent(event)
  })

  document.addEventListener('keyup', event => {
    game.onKeyEvent(event)
  })

  // ====================================
  // Mobile Events
  // ====================================

  game.canvas.addEventListener('touchstart', event => {
    event.keyCode = KEY_UP;
    game.onKeyEvent(event);
  });

  game.canvas.addEventListener('touchend', event => {
    event.keyCode = KEY_UP;
    game.onKeyEvent(event);
  });

  // Desactivar Zoom
  let lastTouchEnd = 0; 
  document.addEventListener('touchend', function (event) { 
    let now = (new Date()).getTime(); 
    if (now - lastTouchEnd <= 300) { 
        event.preventDefault(); 
    } 
    lastTouchEnd = now; 
  }, false); 

});
