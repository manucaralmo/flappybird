class Pipe {
    constructor(ctx, x, y, width, height, type){
      this.ctx = ctx
      this.x = x
      this.y = y
      this.width = width
      this.height = height

      this.vx = -4

      this.type = type

      this.img = new Image()
      this.img.src = `assets/img/pipe-${type}.png`;
      this.img.isReady = false
      this.img.onload = () => {
          this.img.isReady = true
      }
    }

    isReady() {
        return this.img.isReady
    }

    draw() {
      //this.ctx.fillRect(this.x, this.y, this.width, this.height)
      if (this.isReady()){
          this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
    }

    move() {
      this.x += this.vx
    }
  }