class Game {

  constructor(canvasId, onGameEnd) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = Math.min(384, window.innerWidth);
    this.canvas.height = Math.min(498, window.innerHeight);
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = 1000 / 60;

    this.background = new Background(this.ctx);
    this.flappybird = new FlappyBird(
      this.ctx,
      70,
      Math.floor(this.canvas.height / 2),
    );

    this.pipes = [];
    this.drawPipesCount = 0;
    this.pipesFrequency = 100;
    this.score = 0;
    this.bestScore = Number(localStorage.getItem('best-score') || 0);
    this.onGameEnd = onGameEnd;
  }
  

  onKeyEvent(event) {
    this.flappybird.onKeyEvent(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
        this.addPipes();
        this.checkCollisions();
        this.checkScore();
      }, this.fps)
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  restart() {
    this.score = 0;
    this.pipes = [];
    this.flappybird.x = 70;
    this.flappybird.y = Math.floor(this.canvas.height / 2);
    this.start();
  }

  end() {
    this.stop();
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('best-score', this.bestScore)
    }
    this.onGameEnd();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width >= 0);
  }

  move() {
    this.background.move();
    this.flappybird.move();
    this.pipes.forEach(pipe => pipe.move());
  }

  addPipes() {
    if (this.flappybird.sprite.isReady && (this.drawPipesCount % this.pipesFrequency === 0)) {
      this.pipes = this.pipes.concat(this.randPairOfPipes());
      this.drawPipesCount = 0;
    }
  }

  randPairOfPipes() {
    const space = this.canvas.height - this.background.footerImg.height;
    const gap = (this.flappybird.height * 2) + this.flappybird.jumpImpulse;
    const topSize = Math.floor(Math.random() * (space - gap) * 0.75)
    const bottomSize = space - topSize - gap;
    return [
      new Pipe(this.ctx, this.canvas.width, 0, topSize, 'top'),
      new Pipe(this.ctx, this.canvas.width, this.canvas.height - this.background.footerImg.height - bottomSize, bottomSize, 'bottom'),
    ]
  }

  checkCollisions() {
    const pipe = this.pipes.some(pipe => this.flappybird.collides(pipe));
    if (pipe || (this.flappybird.y + this.flappybird.height) >= this.background.y) {
      this.end();
    }
  }

  checkScore() {
    const pipe = this.pipes
      .filter(pipe => pipe.mode === 'top')
      .filter(pipe => !pipe.isChecked)
      .find(pipe => pipe.x + pipe.width < this.flappybird.x);

    if (pipe) {
      pipe.isChecked = true;
      this.score++;
    }
  }

  draw() {
    this.background.draw();
    this.flappybird.draw();
    this.pipes.forEach(pipe => pipe.draw());
    this.drawPipesCount++;

    this.ctx.save();
    this.ctx.font = "30px FlappyFont";
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillText(
      this.score,
      10,
      40,
    )
    this.ctx.font = "20px FlappyFont";
    this.ctx.fillStyle = "#73bf2e";
    this.ctx.fillText(
      `best: ${this.bestScore}`,
      10,
      this.canvas.height - 10,
    )
    this.ctx.restore();
  }
}
