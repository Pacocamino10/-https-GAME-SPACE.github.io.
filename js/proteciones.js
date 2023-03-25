class Proteccion {
  constructor(game,x) {
    this.game = game;
    this.img = new Image();
    this.img.src = "PNG/Meteors/Meteor_09.png";
    this.width = 120;
    this.height = 120;
    this.contadorColision=0;

    this.x = 165 + x;
    this.y = 850;
  }

  draw() {    const { ctx } = this.game;

   ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   

  }
  move() {
    
  }
}
