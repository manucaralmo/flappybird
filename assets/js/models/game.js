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
        this.pipeFrames = 70
        this.pipeFramesCount = 0

        this.score = 0
        this.record = localStorage.getItem("FlappyRecord");
    }

    // Start game
    start() {
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                this.clear()
                this.draw()
                this.checkCollisions()
                this.move()
                if(this.pipeFramesCount >= this.pipeFrames){
                    this.newPipes()
                    this.pipeFramesCount = 0
                }
                this.pipeFramesCount++
                this.cleanPipes()
            }, this.fps)
        }
    }

    // Stop game
    stop() {
        clearInterval(this.intervalId)
        this.gameOverScreen()
        this.gameStart = false
    }

    // Draw game elements
    draw() {
        this.background.draw()
        this.floor.draw()
        this.bird.draw()
        this.showScore()

        // Draw Pipes
        this.pipes.forEach(pipe => {
            pipe.draw()
        })

        // Check floor collision
        if(this.bird.y >= 538){
            this.stop()
        }
    }

    // Clear canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // Move game elements
    move() {
        if(this.gameStart){
            this.floor.move()
            this.bird.move()
            // Move Pipes
            this.pipes.forEach(pipe => {
                pipe.move()
            })
        }
    }

    // Add new pair of pipes to the canvas
    newPipes() {
        if(this.gameStart){
            let randomTopHeight = Math.floor(Math.random() * 400);
            let randomBottomHeight = 400 - randomTopHeight
    
            this.pipes.push(new Pipe(this.ctx, 455, 0, 55, randomTopHeight, 'top'))
            this.pipes.push(new Pipe(this.ctx, 455, 566 - randomBottomHeight, 55, randomBottomHeight, 'bottom'))

            this.updateScore()
        }
    }

    cleanPipes() {
        this.pipes = this.pipes.filter( pipe => pipe.x + pipe.width >= 0 )
    }

    // Check collisions
    checkCollisions() {
        const pipe = this.pipes.some(pipe => this.bird.checkCollisions(pipe));
        if (pipe) { this.stop() }
    }

    updateScore() {
        this.pipes.forEach(pipe => {
            if(pipe.x <= 250){
                // Sumamos 1 punto
                this.score++
            }
        })
    }

    showScore() {
        this.ctx.save()
            this.ctx.font = '35px Arial Bold'
            this.ctx.fillStyle = 'white'
            this.ctx.textAlign = 'center'
            this.ctx.fillText(
                `${this.score / 2}`, 30, 40,
            )
        this.ctx.restore()
    }


    // OnKeyEvent -- Start game or move bird
    onKeyEvent(event) {
        if(this.gameStart === false){
            if(event.keyCode === KEY_UP){
                // Start the game
                this.gameStart = true
            }
        } else {
            // Move Bird
            this.bird.onKeyEvent(event)
        }
    }

    gameOverScreen() {
        if (this.score > this.record){
            localStorage.setItem("FlappyRecord", this.score);
            this.record = this.score
        }

        this.ctx.save()
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    
        this.ctx.font = '35px Arial Bold'
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(
            'Game over!',
            this.ctx.canvas.width / 2,
            (this.ctx.canvas.height / 2) - 25,
        )
        this.ctx.font = '25px Arial'
        this.ctx.fillText(
            `Your points: ${this.score / 2}`,
            (this.ctx.canvas.width / 2),
            (this.ctx.canvas.height / 2) + 15,
        )
        this.ctx.fillText(
            `Record: ${this.record / 2}`,
            (this.ctx.canvas.width / 2),
            (this.ctx.canvas.height / 2) + 45,
        )
        this.ctx.restore()

        // Reload Game
        document.addEventListener('keydown', () => {
            location.reload();
        })
        this.canvas.addEventListener('touchstart', () => {
            location.reload();
        });
    }
}