class Bullet {
	constructor(game) {
		this.game = game;

		const { player } = game;
		this.img = new Image();
		this.img.src = "PNG/Props/Missile_03.png";
		this.pos = {
			x: player.pos.x + player.width/2-20,
			y: player.pos.y,
		};
		this.width=40;
		this.heigth=50

		this.speed = {
		
			y: 10,
		};


		this.radius = +10;
	}

	draw() {
		const { ctx } = this.game;

		ctx.beginPath();
		ctx.save();
		ctx.drawImage(this.img, this.pos.x, this.pos.y,this.width,this.heigth);
		ctx.fill();
		ctx.restore();
		ctx.closePath();
	}

	move() {
		this.pos.y -= this.speed.y
	}
}
