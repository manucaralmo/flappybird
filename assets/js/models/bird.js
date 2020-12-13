class Bird {
    constructor(ctx){
        this.ctx = ctx
        this.x = 120
        this.y = 250

        this.vy = 0
        this.gravity = 0.4

        this.sprite = new Image()
        this.sprite.src = 'assets/img/bird.png'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 3
        this.sprite.verticalFrames = 1
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.width = this.sprite.frameWidth
            this.height = this.sprite.frameHeight
        }

        this.moveUp = false
    }

    isReady() {
        return this.sprite.isReady
    }

    draw() {
        if (this.isReady()){
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
        }
    }

    move() {
        this.vy += this.gravity
        this.y += this.vy
        if(this.moveUp){
            this.vy = -6
            this.animate()
        } else {
            this.resetAnimation()
        }
        if (this.y >= 538){
            this.y = 538
        }
    }

    animate() {
        if(this.sprite.horizontalFrameIndex === 2){
            this.sprite.horizontalFrameIndex = 0
        } else {
            this.sprite.horizontalFrameIndex++
        }
    }

    animateJump() {
        
    }

    resetAnimation() {
        this.sprite.horizontalFrameIndex = 0
      }

    onKeyEvent(event) {
        const status = event.type === 'keydown'

        switch (event.keyCode) {
            case 32:
                this.moveUp = status
              break;
          }
    }
}