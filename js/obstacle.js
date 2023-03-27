class Obstacle {
	contador=0;
	
  constructor(game) {
    this.img = new Image();
    this.img.src = "PNG/Meteors/meteorito.png";
    this.width = 110 / 2;
    this.height = game.player.height * 0.8;
    this.pos = {
      x: 0,
      y: 200,
    };
    this.game = game;
    this.speed = 1;
    this.dx = 10;
    this.contadorColision=0;

  }



  draw() {
    const { ctx } = this.game;
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  }

  move() {
	this.pos.x += this.speed;
	
     if (this.pos.x >=( 900 - this.width) || this.pos.x <=0) {
	  //console.log("CHOCANDO MURO");
	  this.contador++;
	  this.speed *= -1;
	  if(this.contador){
		//console.log("contador "+this.contador); 
		this.pos.y +=50;
		}
		}
  }
}
