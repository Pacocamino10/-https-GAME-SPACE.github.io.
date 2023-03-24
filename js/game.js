const Game = {
  ctx: undefined,
  width: 700,
  height: 1000,
  scoreBoard: ScoreBoard,
  fps: 60,
  keys: {
    IZQ: "ArrowLeft",
    DCHA: "ArrowRight",
    SHOOT: "Space",
  },

  init() {
    const canvas = document.querySelector("canvas");
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
    this.score = 0;

    this.scoreBoard.init(this.ctx);
  },

  start() {
    this.frameCounter = 0;
    this.contadorObs = 0;
    this.contadorAlien = 0;
    this.contadorProteccion = 0;
    this.animationLoopId = setInterval(() => {
      this.clear();

      this.frameCounter++;
      this.score += 0.01;
      if (this.frameCounter % 80 === 0) {
        if (this.contadorObs < 10) {
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

      if (this.isCollisionBullet()) {
        this.clearObstacles();
      }
      if (this.isCollisionBulletAlien()) {
        this.clearObstacles();
      }
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
    this.protecciones.push(new Proteccion(this, 300));
  },

  isCollisionBullet() {
    return this.obstacles.some((obstacle) => {
      return this.player.bullets.some((bullet) => {
        const isCollision =
          bullet.pos.x > obstacle.pos.x &&
          bullet.pos.x < obstacle.pos.x + obstacle.width &&
          bullet.pos.y > obstacle.pos.y &&
          bullet.pos.y < obstacle.pos.y + obstacle.height;

        if (isCollision) {
      
          this.obstacles = this.obstacles.filter((o) => o !== obstacle);
          this.player.bullets = this.player.bullets.filter((b) => b !== bullet);
        }

        return isCollision;
      });
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

          this.aliens = this.aliens.filter((o) => o !== alien);
          this.player.bullets = this.player.bullets.filter((b) => b !== bullet);
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
    if (confirm("FIN DEL JUEGO. ¿VOLVER A EMPEAZAR?")) this.init();
  },
};
