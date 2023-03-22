class Player {
  constructor(x, y, game) {
    this.game = game;

    this.img = new Image();
    this.img.src = "PNG/navesYaliens/pngwing.com.png";

    this.img.currentFrame = 0;
    this.img.frameCount = 3;

    this.width = 146 * 0.5;
    this.height = 180 * 0.5;

    this.y0 = game.height * 0.8;

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

    this.controls = {
      left: {
        pressed: false,
      },
      right: {
        pressed: false,
      },
    };
  }

  setCotrols() {
    const { IZQ, DCHA } = this.game.keys;

    addEventListener("keydown", ({ code }) => {
      switch (code) {
        case IZQ:
          if (this.pos.x > 0) {
            console.log("izquierda");
            this.speed.x = -3;
            this.controls.left.pressed = true;
          }
          break;

        case DCHA:
          if (this.width < this.game.width) {
            console.log("derecha");
            this.speed.x = 3;
            this.controls.right.pressed = true;
          }
          break;
      }
    });
    addEventListener("keyup", ({ code }) => {
      switch (code) {
        case IZQ:
          this.speed.x = 0;
		  this.controls.left.pressed = false;
          break;

        case DCHA:
          if (this.width < this.game.width) {
            console.log("derecha");
            this.speed.x = 0;
			this.controls.right.pressed = false;

          }
          break;
      }
    });
  }

  draw() {
    const { ctx } = this.game;

    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);

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

  move() {
    

    if (this.controls.right.pressed) {
      this.speed.x = 3;
    } else if (this.controls.left.pressed) {
      this.speed.x = -3;
    } else {
		this.speed.x = 0;
    }

	this.pos.x += this.speed.x;
  }
}
