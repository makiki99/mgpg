let sampleLevel = {
	levelData : [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0]
	],
	spawnpoint : [10,14]
};

function loadLevel(level) {
	clearGroup(walls);
	clearGroup(bgElements);
	for (var i = 0; i < level.levelData.length; i++) {
		for (var j = 0; j < level.levelData[i].length; j++) {
			let posX = TSIZE*j;
			let posY = TSIZE*i+1;
			switch (level.levelData[i][j]) {
				case 0:
					loadBgElement("img/bgwall.png", posX, posY);
					break;
				case 1:
					loadWall("img/wall.png", posX, posY);
					break;
			}
		}
	}
	player.x = level.spawnpoint[0]*TSIZE+4;
	player.y = level.spawnpoint[1]*TSIZE+8;
}

function loadBgElement(img, x, y) {
	spr = g.sprite(img);
	spr.x = x;
	spr.y = y;
	bgElements.addChild(spr);
}

function loadWall(img, x, y) {
	spr = g.sprite(img);
	spr.x = x;
	spr.y = y;
	walls.addChild(spr);
}
function clearGroup(group) {
	group.children.forEach((element)=>{
		element.remove();
	})
}
