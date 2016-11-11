function loadPlayer() {
	player = g.sprite("img/player.png");
	player.inAir = true;
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

	function getTile(x,y) {
		if (worldData[x] !== undefined && worldData[x][y] !== undefined) {
			return worldData[x][y];
		} else {
			return 2;
		}
	}

	let tileData = [
		getTile(tilePos[0],tilePos[1]),
		getTile(tilePos[0]+1,tilePos[1]),
		getTile(tilePos[0],tilePos[1]+1),
		getTile(tilePos[0]+1,tilePos[1]+1),
	];

	let walls = [], pushers = [], goal = [];
	let checkedTiles = [false,false,false,false];

	//vertical walls
	if (tileData[0] === 2 && tileData[2] === 2) {
		walls.push(createElement(tilePos[0],tilePos[1],1,2));
		checkedTiles[0] = true;
		checkedTiles[2] = true;
	}
	if (tileData[1] === 2 && tileData[3] === 2) {
		walls.push(createElement(tilePos[0]+1,tilePos[1],1,2));
		checkedTiles[1] = true;
		checkedTiles[3] = true;
	}

	// horizontal walls
	if (tileData[0] === 2 && tileData[1] === 2) {
		walls.push(createElement(tilePos[0],tilePos[1],2,1));
		checkedTiles[0] = true;
		checkedTiles[1] = true;
	}
	if (tileData[2] === 2 && tileData[3] === 2) {
		walls.push(createElement(tilePos[0],tilePos[1]+1,2,1));
		checkedTiles[2] = true;
		checkedTiles[3] = true;
	}

	for (let i = 0; i < 4; i++) {
		if (!checkedTiles[i]) {
			switch (tileData[i]) {
				case 2:
					walls.push(createElement(tilePos[0]+(i%2),tilePos[1]+Math.floor(i/2),1,1));
					break;
				case 3:
					pushers.push(createElement(tilePos[0]+(i%2),tilePos[1]+Math.floor(i/2),1,1));
					pushers[pushers.length-1].direction = "left";
					break;
				case 4:
					pushers.push(createElement(tilePos[0]+(i%2),tilePos[1]+Math.floor(i/2),1,1));
					pushers[pushers.length-1].direction = "up";
					break;
				case 5:
					pushers.push(createElement(tilePos[0]+(i%2),tilePos[1]+Math.floor(i/2),1,1));
					pushers[pushers.length-1].direction = "right";
					break;
				case 6:
					pushers.push(createElement(tilePos[0]+(i%2),tilePos[1]+Math.floor(i/2),1,1));
					pushers[pushers.length-1].direction = "down";
					break;
				case 7:
					goal.push(createElement(tilePos[0]+(i%2),tilePos[1]+Math.floor(i/2),1,1));
					break;
			}
		}
	}

	walls.forEach(
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
	g.remove(walls);

	let pushDir = {
		up: false,
		down: false,
		right: false,
		left: false
	}

	pushers.forEach(
		box => {
			let playerHit = g.hit(player, box);
			if (playerHit) {
				pushDir[box.direction] = true;
			}
		}
	)
	g.remove(pushers);

	for (var i = 0; i < goal.length; i++) {
		if (g.hit(player,goal[i])) {
			nextLevel();
		}
	}
	g.remove(goal);

	//velocity
	player.vx = 0; //ensures horizontal velocity being constant
	if (pushDir.up) {
		player.vy -= 1;
	}
	if (pushDir.down) {
		player.vy += 1;
	}
	if (pushDir.left) {
		player.vx -= 2;
	}
	if (pushDir.right) {
		player.vx += 2;
	}

	if (keys[37]) {
		player.vx -= 3;
	}
	if (keys[39]) {
		player.vx += 3;
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
}

function createElement(x,y,w,h) {
	let temp = g.rectangle(TSIZE*w,TSIZE*h);
	temp.x = TSIZE*x;
	temp.y = TSIZE*y;
	world.addChild(temp);
	return temp;
}
