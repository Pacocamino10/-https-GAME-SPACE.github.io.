class Player {
  constructor(game) {
    this.game = game;

    this.img = new Image();
    this.img.src = "PNG/navesYaliens/nave1.png";
  

    this.img.currentFrame = 0;
    this.img.frameCount = 3;

    this.width = 150;
    this.height = 150;

    this.y0 = game.height * 0.85;

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
    const { IZQ, DCHA, SHOOT } = this.game.keys;
    addEventListener("keydown", ({ code }) => {
      switch (code) {
        case IZQ:
          if (this.pos.x > 0) {
            this.speed.x = -3;
            this.controls.left.pressed = true;
          }
          break;

        case DCHA:
          if (this.pos.x < (this.game.width)- this.width) {
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

        case SHOOT:
          const audio = new Audio("musica/dissparo.mp3");
          audio.play(); 
          this.shoot();
          break;
        case DCHA:
          if (this.width < this.game.width) {
            this.speed.x = 0;
            this.controls.right.pressed = false;
          }
      }
    });
  }
  shoot() {
    this.bullets.push(new Bullet(this.game));
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
      this.speed.x = 10;
    } else if (this.controls.left.pressed) {
      this.speed.x = -10;
    } else {
      this.speed.x = 0;
    }

    this.pos.x += this.speed.x;
  }
}
