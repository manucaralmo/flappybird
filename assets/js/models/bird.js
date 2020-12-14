class Bird {
    constructor(ctx){
        this.ctx = ctx
        this.x = 120
        this.y = 250

        this.vy = 0
        this.gravity = 0.6

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

        this.jump = false
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

        // Jump & animate
        if(this.jump){
            this.vy = -7
            this.animate()
        } else {
            // Reset bird animation
            this.resetAnimation()
        }

        // Check floor collision
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

    resetAnimation() {
        this.sprite.horizontalFrameIndex = 0
    }

    checkCollisions(element) {
        return this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y < element.y + element.height &&
        this.y + this.height > element.y;
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown' || event.type === 'touchstart';

        switch (event.keyCode) {
            case KEY_UP:
                this.jump = status
                break;
        }
    }
}