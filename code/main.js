const TSIZE = 32;
let assets = [
	"img/playerL.png",
	"img/playerR.png",
	"img/tileset.png",
	"maps/level_1.json"
];
let keys = [];
let g = hexi(TSIZE*16,TSIZE*16, setup, assets, load);
let cam, world, player;
let worldData;
let tileDebugData = [];

g.start();

function load() {
	g.loadingBar();
}

function setup() {
	loadLevel("maps/level_1.json");
	cam = g.worldCamera(world);
	for (var i = 0; i < 4; i++) {
		tileDebugData.push(g.rectangle(32,32,0x00ff00));
		tileDebugData[i].alpha = 0.5;
		world.addChild(tileDebugData[i]);
	}
	g.state = play;
}

function play() {
	updatePlayer();
	updateCamera();
	//updateTimer();
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
