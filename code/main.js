const TSIZE = 32;
let assets = [
	"img/playerL.png",
	"img/playerR.png",
	"img/tileset.png"
];

let levelList = [
	"maps/level_1.json"
];
let currentLevel = 0;

let keys = [];
let g = hexi(TSIZE*16,TSIZE*16, setup, assets, load);
let cam, world, player;
let worldData;

levelList.forEach(lvl=>{assets.push(lvl);});
g.start();

function load() {
	g.loadingBar();
}

function setup() {
	loadLevel("maps/level_1.json");
	cam = g.worldCamera(world);
	g.state = play;
}

function play() {
	updatePlayer();
	updateCamera();
	//updateTimer();
}

function end() {

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
