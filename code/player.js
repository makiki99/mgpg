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
	}

	//sprite change
	if (player.vx < 0) {
		player.show(0);
	} else if (player.vx > 0){
		player.show(1);
	}
}
