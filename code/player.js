function loadPlayer() {
	player = g.sprite([
		"img/playerL.png",
		"img/playerR.png"
	]);
	player.inAir = true;
	scene.addChild(player);
}

function updatePlayer() {
	g.move(player);

	//collision
	player.inAir = true;
	let tilePos = [Math.floor(player.x / 32), Math.floor(player.y / 32)];
	let tilesToCheck = [
		[tilePos[0],tilePos[1]],
		[tilePos[0]+1,tilePos[1]],
		[tilePos[0],tilePos[1]+1],
		[tilePos[0]+1,tilePos[1]+1]
	]
	let tileData = [
		worldData[tilePos[0]][tilePos[1]],
		worldData[tilePos[0]+1][tilePos[1]],
		worldData[tilePos[0]][tilePos[1]+1],
		worldData[tilePos[0]+1][tilePos[1]+1],
	];
	for (let i = 0; i < 4; i++) {
		tileDebugData[i].x = tilesToCheck[i][0]*32;
		tileDebugData[i].y = tilesToCheck[i][1]*32;
	}

	let walls = g.group();
	let checkedTiles = [false,false,false,false];

	//vertical walls
	if (tileData[0] === 2 && tileData[2] === 2) {
		walls.addChild(createCollisionWall(tilePos[0],tilePos[1],1,2));
		checkedTiles[0] = true;
		checkedTiles[2] = true;
	}
	if (tileData[1] === 2 && tileData[3] === 2) {
		walls.addChild(createCollisionWall(tilePos[0]+1,tilePos[1],1,2));
		checkedTiles[1] = true;
		checkedTiles[3] = true;
	}

	// horizontal walls
	if (tileData[0] === 2 && tileData[1] === 2) {
		walls.addChild(createCollisionWall(tilePos[0],tilePos[1],2,1));
		checkedTiles[1] = true;
		checkedTiles[3] = true;
	}
	if (tileData[2] === 2 && tileData[3] === 2) {
		walls.addChild(createCollisionWall(tilePos[0],tilePos[1]+1,2,1));
		checkedTiles[1] = true;
		checkedTiles[3] = true;
	}

	for (let i = 0; i < 4; i++) {
		if (!checkedTiles[i] && tileData[i] === 2) {
			walls.addChild(createCollisionWall(tilePos[0]+(i%2),tilePos[1]+Math.floor(i/2),1,1))
		}
	}

	walls.children.forEach(
		box => {
			let playerHit = g.rectangleCollision(player, box);
			switch (playerHit) {
				case "bottom":
					player.inAir = false;
					player.vy = 0;
					break;
				case "top":
					player.vy = 0;
					break;
				case "left":
				case "right":
					player.vx = 0;
					break;
			}
		}
	)
	//velocity
	player.vx *= 0.4;
	if (keys[37]) {
		player.vx -= 2;
	}
	if (keys[39]) {
		player.vx += 2;
	}
	if (keys[38] & !player.inAir) {
		player.vy = -12;
		player.inAir = true;
	}
	player.vy += 0.5;
	if (player.vy < -12) {
		player.vy = -12;
	} else if (player.vy > 12) {
		player.vy = 12;
	}

	//sprite change
	if (player.vx < 0) {
		player.show(0);
	} else if (player.vx > 0){
		player.show(1);
	}
}

function createCollisionWall(x,y,w,h) {
	let temp = g.rectangle(TSIZE*w,TSIZE*h);
	temp.visible = false;
	temp.x = TSIZE*x-cam.x;
	temp.y = TSIZE*y-cam.y;
	return temp;
}
