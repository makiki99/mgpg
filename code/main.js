const TSIZE = 32;
let assets = [
	"img/playerL.png",
	"img/playerR.png",
	"img/tileset.png"
];

let levelList = [
	"maps/level_1.json",
	"maps/level_2.json"
];
let currentLevel;
let frameCount;

let keys = [];
let worldData;
let g = hexi(TSIZE*16,TSIZE*17, setup, assets, load);

let splashContainer, splashTitle, splashMessage;
let camLayer, cam, world, player;
let hud, timer = g.text(""), levelInfo = g.text("");
let endContainer, endTimer;
let animContainer;
let animation;

levelList.forEach(lvl=>{assets.push(lvl);});

g.scaleToWindow();
g.start();

function load() {
	g.loadingBar();
}

function setup() {

	camLayer = g.group();
	//loadLevel(levelList[0]);

	hud = g.group();
	hud.y = TSIZE*16;
	//hud background
	hud.addChild(g.rectangle(TSIZE*16, TSIZE, "black", "white", 0, 0, 0));

	levelInfo.style = {font: TSIZE+"px monospace", fill: "white", align: "center"};
	levelInfo.x = TSIZE*0.5;
	hud.addChild(levelInfo)

	timer.style = {font: TSIZE+"px monospace", fill: "white", align: "center"};
	timer.x = TSIZE*15.5-timer.width;
	hud.addChild(timer);

	endContainer = g.group();
	endContainer.addChild(g.rectangle(TSIZE*16, TSIZE*17, "black", "white", 0, 0, 0));
	endTimer = g.text("");
	endContainer.addChild(endTimer);
	endTimer.style = {font: TSIZE+"px monospace", fill: "white", align: "center"};

	splashContainer = g.group();
	splashContainer.addChild(g.rectangle(TSIZE*16, TSIZE*17, "black", "white", 0, 0, 0));
	splashTitle = g.text("MINIMALIST GENERIC\nPLATFORM GAME");
	splashTitle.style = {font: TSIZE+"px monospace", fill: "white", align: "center"};
	splashContainer.putCenter(splashTitle,0,-4*TSIZE);
	splashMessage = g.text(
		"Press enter to start\n\
		Use arrow keys to move and jump.\n"
	);
	splashMessage.style = {font: TSIZE/2+"px monospace", fill: "white", align: "center"};
	splashContainer.putCenter(splashMessage,0,2*TSIZE);
	splashContainer.addChild(splashTitle);
	splashContainer.addChild(splashMessage);

	animContainer = g.group();

	g.state = splash;

}

function splash() {
	splashContainer.visible = true;
	camLayer.visible = false;
	hud.visible = false;
	endContainer.visible = false;
	if (keys[13]) {
		currentLevel = 0;
		frameCount = 0;
		loadLevel(levelList[0]);
		animation = {
			/*
				possible animation types:
				0 - no animation
				1 - level switch animation
				2 - game end animation
			*/
			animFrame : 0,
			animType : 0
		};
		g.state = play;
	}
}

function play() {
	splashContainer.visible = false;
	camLayer.visible = true;
	hud.visible = true;
	endContainer.visible = false;
	updatePlayer();
	updateCamera();
	updateTimer();
	updateAnimation();
}

function end() {
	splashContainer.visible = false;
	camLayer.visible = false;
	hud.visible = false;
	endContainer.visible = true;
	endTimer.content = "TIME:\n" + timer.content;
	endContainer.putCenter(endTimer,0,0);
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
