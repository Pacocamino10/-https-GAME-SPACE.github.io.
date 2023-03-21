class Player {
	constructor(x, y, game) {
		this.game = game;

		this.img = new Image();
		this.img.src = 'assets/player.png';

		this.img.currentFrame = 0;
		this.img.frameCount = 3;

		this.width = 146 * 0.5;
		this.height = 180 * 0.5;

		this.y0 = game.height * 0.8;

		console.log(this.y0);

		this.pos = {
			x: game.width * 0.2,
			y: this.y0,
		};

		this.speed = {
			x: 0,
			y: 0,
		};

		this.bullets = [];

		this.setCotrols();
	}

	setCotrols() {
		const { JUMP, SHOOT } = this.game.keys;

		addEventListener('keyup', ({ code }) => {
			switch (code) {
				case JUMP:
					if (this.y0 === this.pos.y) {
						this.speed.y = -10;
						this.pos.y -= 1;
					}
					break;

				case SHOOT:
					this.shoot();
					break;
			}
		});
	}

	draw(frameCounter) {
		const { ctx } = this.game;

		this.animateSprite(frameCounter);

		ctx.drawImage(
			this.img,
			this.img.currentFrame * (this.img.width / this.img.frameCount),
			0,
			this.img.width / this.img.frameCount,
			this.img.height,
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		);

		this.bullets = this.bullets.filter(
			(bullet) => bullet.pos.x - bullet.radius < this.game.width
		);

		this.bullets.forEach((bullet) => {
			bullet.draw();
			bullet.move();
		});
	}

	shoot() {
		this.bullets.push(new Bullet(this.game));
	}

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.currentFrame++;

			if (this.img.currentFrame === this.img.frameCount) {
				this.img.currentFrame = 0;
			}
		}
	}

	move() {
		const gravity = 0.5;

		if (this.pos.y < this.y0) {
			this.speed.y += gravity;
		} else {
			this.speed.y = 0;
			this.pos.y = this.y0;
		}

		this.pos.y += this.speed.y;
	}
}
