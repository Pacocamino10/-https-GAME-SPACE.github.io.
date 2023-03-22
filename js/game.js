const Game = {
	ctx: undefined,
	width:700,
	height: 1000,
	scoreBoard: ScoreBoard,
	fps: 60,
	keys: {
		IZQ: 'ArrowLeft',
		DCHA: 'ArrowRight',
	},

	init() {
		const canvas = document.querySelector('canvas');
		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canvas.getContext('2d');
		this.setup();
		this.start();
	},

	setup() {
		console.log('Estableciendo valores iniciales para el juego');
		this.player = new Player(0, 0, this);
		this.background = new Background(this);
		this.proteccion = new Proteccion(this);
		this.obstacle = new Obstacle(this);

		this.obstacles=[];
		
		this.score = 0;

		this.scoreBoard.init(this.ctx);
	},

	start() {
		this.frameCounter = 0;
		this.contadorObs=0;

		
		this.animationLoopId = setInterval(() => {
			this.clear();

			this.frameCounter++;
			this.score += 0.01;
			if (this.frameCounter % 80 === 0)
			
			if(this.contadorObs<5){
				this.generateObstacle();
			this.contadorObs++}
		
	

			this.drawAll();
			this.moveAll();

			this.scoreBoard.update(this.score);

			

			this.clearObstacles();
		}, 1000 / this.fps);

		
	},

	drawAll() {
		this.background.draw();
		this.proteccion.draw()
		this.obstacles.forEach((obstacle) => {
			obstacle.draw();
		});
		
		this.player.draw();
	},

	moveAll() {
		this.background.move();

		this.obstacles.forEach((obstacle) => {
			obstacle.move();
		});

		 this.player.move(this.frameCounter);
	},

	clearObstacles() {
		
		this.obstacles = this.obstacles.filter(
			(obstacle) => obstacle.pos.x + obstacle.width > 0
		);
	},
	generateObstacle() {
		
	
			this.obstacles.push(new Obstacle(this))
			
		
	},

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	gameOver() {
		clearInterval(this.animationLoopId);
		if (confirm('FIN DEL JUEGO. ¿VOLVER A EMPEAZAR?')) this.init();
	},
};
