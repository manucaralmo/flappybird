class FlappyBird {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.jumpImpulse = 70;
    this.vy = 3;

    this.sprite = new Image();
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.verticalFrames = 1;
    this.sprite.src = 'assets/img/bird.png';
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWidth;
      this.height = this.sprite.frameHeight;
    }

    this.drawCount = 0;

    this.movements = {
      up: false
    }
  }

  onKeyEvent(event) {
    const status = event.type === 'keydown' || event.type === 'touchstart';
    switch (event.keyCode) {
      case KEY_UP:
        this.movements.up = status;
        if (status) {
          this.y -= this.jumpImpulse;
        }
        break
    }
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      this.drawCount++;
      this.animate();
    }
  }

  animate() {
    this.animateFrame(0, 2, 3, 10);
  }

  animateFrame(initVerticalFrame, initHorizontalFrame, segments, frequency) {
    if (this.sprite.verticalFrameIndex !== initVerticalFrame) {
      this.sprite.verticalFrameIndex = initVerticalFrame;
      this.sprite.horizontalFrameIndex = initHorizontalFrame;
    } else if (this.drawCount % frequency === 0) {
      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % segments;
      this.drawCount = 0;
    }
  }

  move() {
    this.y += this.vy;
  }

  collides(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y;
  }

}
