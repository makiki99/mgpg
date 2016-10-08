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
	let playerHit = g.contain(player, {
			x:gamefield.x,
			y:gamefield.y,
			width:gamefield.width+gamefield.x,
			height:gamefield.height+gamefield.y
		}
	);
	if (playerHit) {
		if (playerHit.has("bottom")) {
			player.inAir = false;
			player.vy = 0;
		}
		if (playerHit.has("top")) {
			player.vy = 0;
		}
	}
	walls.children.forEach(
		box => {
			playerHit = g.rectangleCollision(player, box);
			switch (playerHit) {
				case "bottom":
					player.inAir = false;
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
	player.vx *= 0.72;
	if (keys[37]) {
		player.vx -= 2;
	}
	if (keys[39]) {
		player.vx += 2;
	}
	if (keys[38] & !player.inAir) {
		player.vy = -15;
		player.inAir = true;
	}
	player.vy += 0.5;

	//sprite change
	if (player.vx < 0) {
		player.show(0);
	} else if (player.vx > 0){
		player.show(1);
	}
}
