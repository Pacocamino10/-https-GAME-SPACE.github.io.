class Background {
	constructor(game) {
		this.game = game;

		this.img = new Image();

		this.img.src = 'fondo/fondoEstrellas.jpg';

		this.x = 0;
		this.y = 0;

		this.dx = 5;
		this.dy = 10;
	}

	draw() {
		this.game.ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.game.width,
			this.game.height
		);

		this.game.ctx.drawImage(
			this.img,
			this.x ,
			this.y-this.game.height,
			this.game.width,
			this.game.height
		);
	}

	move() {

//  addEventListener('keydown', ({code}) => { console.log(code)});

		if (this.y  >= this.game.height) {
			this.y = 0;
		}

		this.y += this.dy;
	}
}
 