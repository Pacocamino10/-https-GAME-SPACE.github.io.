class Obstacle {
	constructor(game) {
		this.width = game.player.width / 2;
		this.height = game.player.height * 0.8;

		this.pos = {
			x: game.width,
			y: game.player.y0 + game.player.height - this.height,
		};

		this.game = game;

		this.dx = 10;
	}

	draw() {
		this.game.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	}

	move() {
		this.pos.x -= this.dx;
	}
}
