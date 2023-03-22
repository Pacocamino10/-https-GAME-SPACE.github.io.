class Proteccion {
  constructor(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = "PNG/Meteors/Meteor_09.png";
    this.width = 120;
    this.height = 120;

    this.x = 115;
    this.y = innerHeight * 0.7;
  }

  draw() {
    this.game.ctx.drawImage(this.img, 80, this.y, this.width, this.height);
    this.game.ctx.drawImage(this.img, 290, this.y, this.width, this.height);
    this.game.ctx.drawImage(this.img, 500, this.y, this.width, this.height);
  }
}
