const Game = {
  ctx: undefined,
  width: 900,
  height: 1200,
  scoreBoard: ScoreBoard,
  fps: 70,
  keys: {
    IZQ: "ArrowLeft",
    DCHA: "ArrowRight",
    SHOOT: "Space",
  },

  init() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = this.width;
    canvas.height = this.height;

    this.ctx = canvas.getContext("2d");
    this.setup();
    this.start();
  },



  setup() {
    console.log("Estableciendo valores iniciales para el juego");
    this.player = new Player(this);
    this.background = new Background(this);
    this.proteccion = new Proteccion(this);
    this.obstacle = new Obstacle(this);
    this.bullet = new Bullet(this);
    this.bulletAlien = new BulletAlien(this);
    this.obstacles = [];
    this.aliens = [];
    this.protecciones = [];
    this.bullets = [];
    this.bulletsAlien = [];
    this.score = 0;

    this.scoreBoard.init(this.ctx);
  },

  start() {
    this.frameCounter = 0;
    this.contadorObs = 0;
    this.contadorAlien = 0;
    this.contadorProteccion = 0;
    this.contadorPlayer = 0;
    this.animationLoopId = setInterval(() => {
      this.clear();

      this.frameCounter++;
      this.score += 0.01;
      if (this.frameCounter % 80 === 0) {
        if (this.contadorObs < 20) {
          this.generateObstacle();
          this.contadorObs++;
        }
        if (this.contadorAlien < 3) {
          this.generateAlien();
          this.contadorAlien++;
        }
        if (this.contadorProteccion < 1) {
          this.generateProteccion();
          this.contadorProteccion++;
        }
      }

      this.drawAll();
      this.moveAll();

      this.scoreBoard.update(this.score);
      if (this.isCollisionObsPlayer())
     
       if(this.contadorPlayer==3){this.gameOver()}
      if (this.isCollisionbulletsAlienPlayer()) {
        this.contadorPlayer++;
      };
      if (this.isCollisionBulletObstacle());
      if (this.isCollisionBulletAlien());
      if (this.isCollisionBulletProteccion());
      if (this.isCollisionObsPro()) {
      }

      if (this.isCollisionBulletAliensProteccion()) {
      }
      if (this.isCollisionObsPlayer()) {
        this.gameOver();
      }

      
      this.clearObstacles();
    }, 1000 / this.fps);
  },

  drawAll() {
    this.background.draw();
    this.proteccion.draw();

    this.obstacles.forEach((obstacle) => {
      obstacle.draw();
    });
    this.aliens.forEach((alien) => {
      alien.draw();
    });

    this.protecciones.forEach((proteccion) => {
      proteccion.draw();
    });

    this.player.draw();
  },

  moveAll() {
    this.background.move();

    this.obstacles.forEach((obstacle) => {
      obstacle.move();
    });
    this.aliens.forEach((alien) => {
      alien.move();
    });
    this.protecciones.forEach((proteccion) => {
      proteccion.move();
    });

    this.player.move(this.frameCounter);
  },

  clearObstacles() {
    this.obstacles = this.obstacles.filter(
      (obstacle) => obstacle.pos.x + obstacle.width > 0
    );
  },
  generateObstacle() {
    this.obstacles.push(new Obstacle(this));
  },
  generateAlien() {
    this.aliens.push(new Alien(this));
  },

  generateProteccion() {
    this.protecciones.push(new Proteccion(this, 0));
    this.protecciones.push(new Proteccion(this, 225));
    this.protecciones.push(new Proteccion(this, 450));
  },

  isCollisionbulletsAlienPlayer() {
    return this.bulletsAlien.some(
      (bullet) => {
        const isCollision =
        bullet.x > this.player.pos.x &&
        bullet.x < this.player.pos.x + this.player.width &&
        bullet.y > this.player.pos.y &&
        bullet.y < this.player.pos.y + this.player.height;

      if (isCollision) {
        console.log("colision");
        this.bulletsAlien = this.bulletsAlien.filter((b) => b !== bullet);
      }

      return isCollision;
      
  });

  },
  isCollisionBulletAlien() {
    return this.aliens.some((alien) => {
      return this.player.bullets.some((bullet) => {
        const isCollision =
          bullet.pos.x > alien.x &&
          bullet.pos.x < alien.x + alien.width &&
          bullet.pos.y > alien.y &&
          bullet.pos.y < alien.y + alien.height;

        if (isCollision) {
          if (alien.contadorColision == 20) {
            this.aliens = this.aliens.filter((o) => o !== alien);
          }
          alien.contadorColision++;

          this.player.bullets = this.player.bullets.filter((b) => b !== bullet);
        }

        return isCollision;
      });
    });
  },
  isCollisionBulletObstacle() {
    return this.obstacles.some((obstacle) => {
      return this.player.bullets.some((bullet) => {
        const isCollision =
          bullet.pos.x > obstacle.pos.x &&
          bullet.pos.x < obstacle.pos.x + obstacle.width &&
          bullet.pos.y > obstacle.pos.y &&
          bullet.pos.y < obstacle.pos.y + obstacle.height;

        if (isCollision) {
          if (obstacle.contadorColision == 3) {
            this.obstacles = this.obstacles.filter((o) => o !== obstacle);
            obstacle.contadorColision == 0;
          }
          obstacle.contadorColision++;
          this.player.bullets = this.player.bullets.filter((b) => b !== bullet);
        }

        return isCollision;
      });
    });
  },
  isCollisionBulletProteccion() {
    return this.protecciones.some((proteccion) => {
      return this.player.bullets.some((bullet) => {
        const isCollision =
          bullet.pos.x > proteccion.x &&
          bullet.pos.x < proteccion.x + proteccion.width &&
          bullet.pos.y > proteccion.y &&
          bullet.pos.y < proteccion.y + proteccion.height;

        if (isCollision) {
          console.log("colision");
          this.player.bullets = this.player.bullets.filter((b) => b !== bullet);
        }

        return isCollision;
      });
    });
  },
  isCollisionObsPlayer() {
    return this.obstacles.some(
      (obstacle) =>
        this.player.pos.x + this.player.width > obstacle.pos.x &&
        this.player.pos.x < obstacle.pos.x + obstacle.width &&
        this.player.pos.y + this.player.height > obstacle.pos.y &&
        this.player.pos.y < obstacle.pos.y + obstacle.height
    );
  },
  isCollisionObsPro() {
    return this.obstacles.some((obstacle) => {
      return this.protecciones.some((proteccion) => {
        const isCollision =
          obstacle.pos.x + obstacle.width > proteccion.x &&
          obstacle.pos.x < proteccion.x + proteccion.width &&
          obstacle.pos.y + obstacle.width > proteccion.y &&
          obstacle.pos.y < proteccion.y + proteccion.height;

        if (isCollision) {
          if (proteccion.contadorColision == 3) {
            this.protecciones = this.protecciones.filter(
              (o) => o !== proteccion
            );
            this.obstacles = this.obstacles.filter((b) => b !== obstacle);
          }
          proteccion.contadorColision++;
        }

        return isCollision;
      });
    });
  },
  isCollisionBulletAliensProteccion() {
    return this.protecciones.some((proteccion) => {
      return this.bulletsAlien.some((bullet) => {
        const isCollision =
          bullet.x + bullet.width > proteccion.x &&
          bullet.x < proteccion.x + proteccion.width &&
          bullet.y + bullet.height > proteccion.y &&
          bullet.y < proteccion.y + proteccion.height;
        if (isCollision) {
          console.log("colision");
          this.bulletsAlien = this.bulletsAlien.filter((b) => b !== bullet);
        }

        return isCollision;
      });
    });
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  gameOver() {
    clearInterval(this.animationLoopId);
    if (confirm("FIN DEL JUEGO. ¿VOLVER A EMPEAZAR?")) new PantallaInicio();
  },
};
