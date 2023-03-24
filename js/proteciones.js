class Proteccion {
  constructor(game,x) {
    this.game = game;
    this.img = new Image();
    this.img.src = "PNG/Meteors/Meteor_09.png";
    this.width = 120;
    this.height = 120;


    this.x = 115 + x;
    this.y = innerHeight * 0.7;
  }

  draw() {    const { ctx } = this.game;

   ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   

  }
  move() {
    
  }
}
