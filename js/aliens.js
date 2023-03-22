class Alien {
  constructor(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = "PNG/navesYaliens/alien.png";
    this.width = 130;
    this.height = 180;
    this.speed=5;
    this.x = 115;
    this.y = innerHeight * 0.01;
  }

  draw() {
    const { ctx } = this.game;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    
  }
  move() {
    console.log("moviendo aliens");
    this.x += this.speed;

    if (this.x >=( 700 - this.width) || this.x <=0) {
      console.log("CHOCANDO MURO");

      this.speed *= -1;
    }
  }
}
