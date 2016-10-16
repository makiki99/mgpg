const TSIZE = 32;
let assets = [
	"img/playerL.png",
	"img/playerR.png",
	"img/tileset.png",
	"img/goal.png",
	"maps/test_level.json"
];
let keys = [];
let g = hexi(TSIZE*16,TSIZE*17, setup, assets, load);
let world, walls, player, goal;
let level = 1;
const ENDLEVEL = 40;

g.start();

function load() {
	g.loadingBar();
}

function setup() {
	loadLevel("maps/test_level.json");
	g.state = play;
}

function menu() {
	/*
		Gamestate function - menu
		Handles Main menu.
	*/
	clearVisibility();
}

function play() {
	clearVisibility();
	world.visible = true;
	player.visible = true;
	goal.visible = true;
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

function clearVisibility() {
	world.visible = false;
	player.visible = false;
	goal.visible = false;
}
