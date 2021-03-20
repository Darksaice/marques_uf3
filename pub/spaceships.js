const scene_w = 640;
const scene_h = 480;

let player_init_x = 32;

let bg;
let player;
let enemies = [];
let bullets = [];

let up_key;
let down_key;
let space_key;

let score;
let cont_score;

let particles;

let the_game;

const BULLET_INIT_X = -1000;
const BULLET_INIT_Y = -1000;

const MAX_ENEMIES = 18;
const MAX_BULLETS = 3;

const SCREEN_MARGIN = 32;

function  preload (){
	console.log("Preload");
		the_game = this;
		this.load.image("background", "stars.jpg");
		this.load.image("character","PNG/Default/ship_sidesA.png");
		this.load.image("enemy","PNG/Default/meteor_detailedLarge.png");
		this.load.image("bullet", "PNG/Default/star_tiny.png");
		this.load.image("explosion", "muzzleflash3.png");
}

function create () {
		bg = this.add.image(scene_w/2,scene_h/2, "background");
		player = this.physics.add.image(player_init_x,scene_h/2, "character");
		player.setScale(1);
		score = this.add.text(scene_w/2,10, "score: "+cont_score);
		for (let i =0; i < MAX_ENEMIES; i++){
			let x = Math.random()*scene_w*10 + scene_w/2;
			let y = Math.random()*scene_h;
			enemies.push(this.physics.add.image(x, y, "enemy"));
		}
		
		for (let i =0; i < MAX_BULLETS; i++){
			bullets.push(this.physics.add.image (BULLET_INIT_X,BULLET_INIT_Y,"bullet"));
			bullets[i].moving = false;
		}

	up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	
	//Comprobación de colision enemigos contra jugador
	enemies.forEach(function(element){
		the_game.physics.add.overlap(player,element, function (p,e){
					the_game.scene.restart();
		}, null, the_game);
	});

	//Particulas
	particles = this.add.particles("explosion");

	particles.createEmitter({
		alpha: {start: 1, end: 0},
		scale: {start: 0.5, end: 2.5},
		//tint: {start: 0xff945e, end 0xff945e},
		speed:20,
		accelerationY: -300,
		angle: {min: -85, max: -95},
		rotate: {min: -180, max: 180},
		lifespan: {min:1000, ma: 1100},
		blendMode: 'ADD',
		frequency: 110,
		maxParticles:10,
		x: enemies ,
		y: enemies
	
	});

	//Comprobación de colision enemigos contra bala
   bullets.forEach(function(element){
     the_game.physics.add.overlap(enemies,element, function(e,e){
         particle.createEmitter;
   },null, the_game);
   });


}

function update (){
	player.rotation = 1.6;
	//Movimiento del player	
	if (up_key.isDown){
		player.y--;
	} else 	if (down_key.isDown){
		player.y++;
	}
	//Disparar balas
	if (Phaser.Input.Keyboard.JustDown(space_key)){ 
		let found = false;
		for (let i =0; i < MAX_BULLETS && !found; i++){
			if (!bullets[i].moving){
				bullets[i].moving = true;
				bullets[i].x = player.x;
				bullets[i].y = player.y;

				found = true;
			}
		}
	}

	for (let i =0; i < MAX_BULLETS; i++){
		if (bullets[i].moving){
			bullets[i].x++;
			if (bullets[i].x >= scene_w + SCREEN_MARGIN){
				bullets[i].x = BULLET_INIT_X;
				bullets[i].y = BULLET_INIT_Y;
				bullets[i].moving = false;
			}
		}	
	}

	for (let i =0; i < MAX_ENEMIES; i++){
		enemies[i].x--;
	}
	
	//Contador de puntos
	if (bullets == enemies){
				cont_score+1;
				cont_score++;
	}

	particles.emitters.first.alive.lenght + "explosion";
	
	
}

const config ={
	type:Phaser.AUTO,
	width: scene_w,
	height: scene_h,
	pixelArt: true,
	physics: {
		default: 'arcade'
	
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);

