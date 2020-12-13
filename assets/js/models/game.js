class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = 450
        this.canvas.height = 650
        this.ctx = this.canvas.getContext('2d')

        this.fps = 1000 / 60
        this.intervalId = undefined

        this.background = new Background(this.ctx)
        this.floor = new Floor(this.ctx)
        this.bird = new Bird(this.ctx)
        
        this.gameStart = false

        this.pipes = []
    }

    start() {
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                this.clear()
                this.draw()
                this.move()
            }, this.fps)
        }
    }

    stop() {
        clearInterval(this.intervalId)
    }

    draw() {
        this.background.draw()
        this.floor.draw()
        this.bird.draw()
        if(this.bird.y >= 538){
            this.stop()
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    move() {
        if(this.gameStart){
            this.floor.move()
            this.bird.move()
        }
    }

    newPipes() {

    }

    onKeyEvent(event) {
        if(this.gameStart === false){
            if(event.keyCode === 32){
                this.gameStart = true
            }
        } else {
            this.bird.onKeyEvent(event)
        }
    }
}