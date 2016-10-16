const TSIZE = 32;
let assets = [
	"img/playerL.png",
	"img/playerR.png",
	"img/tileset.png",
	"img/goal.png"
];
let keys = [];
let g = hexi(TSIZE*16,TSIZE*17, setup, assets, load);
let scene, player, walls, bgElements, gamefield, goal;

g.start();

function load() {
	g.loadingBar();
}

function setup() {
	scene = g.group();
	gamefield = g.rectangle(TSIZE*16, TSIZE*16, 0x000000);
	gamefield.alpha = 0;
	gamefield.x = 0;
	gamefield.y = 0;
	scene.addChild(gamefield);
	walls = g.group();
	scene.addChild(walls);
	bgElements = g.group();
	scene.addChild(bgElements);
	goal = g.sprite("img/goal.png");
	scene.addChild(goal);
	loadPlayer();
	loadLevel(sampleLevel);
	g.state = play;
}

function play() {
	updatePlayer();
}

//keyboard handlers
document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
	if (e.keyCode === 8) {
		e.preventDefault();
	}
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false;
});