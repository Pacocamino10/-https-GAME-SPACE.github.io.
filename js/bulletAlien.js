class BulletAlien {
  constructor(game, x,y) {
    this.game = game;
    this.x = x;
    this.y=y
    this.img = new Image();
    this.img.src = "PNG/Props/Rocket_Effect_01.png";

    // this.x = this.shooter.x + (this.shooter.width / 2);
    // this.y = this.shooter.y + this.shooter.height;
    this.width = 20;
    this.height = 50;

    this.speed = {
      y: -5,
    };

  }

  draw() {
    const { ctx } = this.game;

    ctx.beginPath();
    ctx.save();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  }

  move() {
    this.y -= this.speed.y;
  }
}
