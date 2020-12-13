class Floor extends Background {
    constructor(ctx){
        super(ctx)
        this.y = 566
        this.height = 100
        this.width = this.ctx.canvas.width

        this.vx = -4

        this.img.src = 'assets/img/game-bg-footer.png'
    }

    draw() {
        if (this.isReady()){
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            this.ctx.drawImage(this.img, this.x + 450, this.y, this.width, this.height);
        }
    }

    move() {
        this.x += this.vx

        if(this.x + this.width <= 0){
            this.x = 0;
        }
    }
}