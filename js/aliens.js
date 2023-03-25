class Alien {
  constructor(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = "PNG/navesYaliens/alien3.png";
    this.width = 130;
    this.height = 180;
    this.speed = 3;
    this.x = 115;
    this.y = 0 * 0.01;
    this.contadorColision=0;
  }

  draw() {
    const { ctx } = this.game;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.game.bulletsAlien.forEach((bullet) => {
      bullet.draw();
      bullet.move();
    });
  }

  move() {
    this.x += this.speed;
    let random = Math.floor(Math.random() * (650 - 50) + 50);
    if (this.x >= 700 - this.width || this.x <= 0) {
      this.speed *= -1;
    }
    if (this.x == random || this.x%random==0) {

      this.shoot();
    }
  }
  shoot() {
    this.game.bulletsAlien.push(new BulletAlien(this.game, ((this.x+this.width)/2)-10,this.y+this.height))
  }
}
