let sampleLevel = {
	spriteData : [
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
	collisionData : [
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
	for (var i = 0; i < level.collisionData.length; i++) {
		for (var j = 0; j < level.collisionData[i].length; j++) {
			let posX = TSIZE*j;
			let posY = TSIZE*i+1;
			switch (level.collisionData[i][j]) {
				case 0:
					loadBgElement(level.spriteData[i][j], posX, posY);
					break;
				case 1:
					loadWall(level.spriteData[i][j], posX, posY);
					break;
			}
		}
	}
	player.x = level.spawnpoint[0]*TSIZE+4;
	player.y = level.spawnpoint[1]*TSIZE+8;
}

function loadBgElement(img, x, y) {
	let texture = g.frame(
		"img/tileset.png",
		(img%16)*TSIZE, Math.floor(img/16)*TSIZE,
		32, 32
	)
	spr = g.sprite(texture);
	spr.x = x;
	spr.y = y;
	bgElements.addChild(spr);
}

function loadWall(img, x, y) {
	let texture = g.frame(
		"img/tileset.png",
		(img%16)*TSIZE, Math.floor(img/16)*TSIZE,
		32, 32
	)
	spr = g.sprite(texture);
	spr.x = x;
	spr.y = y;
	walls.addChild(spr);
}
function clearGroup(group) {
	group.children.forEach((element)=>{
		element.remove();
	})
}
