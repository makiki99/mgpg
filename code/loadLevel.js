function loadLevel(level) {
	if (world !== undefined) {
		world.destroy();
	}
	world = g.makeTiledWorld(level,"img/tileset.png");
	player = g.sprite([
		"img/playerL.png",
		"img/playerR.png"
	])
	player.x = world.getObject("player").x;
	player.y = world.getObject("player").y;
	world.addChild(player);
	walls = [];
	let height = world.getObject("World").height/TSIZE;
	let width = world.getObject("World").width/TSIZE;
	for (let i = 0; i < height; i++) {
		let previousGID = 0;
		let currentChain = 0;
		for (let j = 0; j < width; j++) {
			let currentGID = world.getObject("World").data[j+i*width];
			if (currentGID == previousGID) {
				currentChain++;
			} else {
				let rectObj = g.rectangle(
					TSIZE*currentChain,
					TSIZE,
					"white",
					"white",
					0,
					TSIZE*(j-currentChain),
					TSIZE*i
				)
				rectObj.visible = false;
				createElement(previousGID,rectObj);
				currentChain = 1;
				previousGID = currentGID;
			}
		}
		let rectObj = g.rectangle(
			TSIZE*currentChain,
			TSIZE,
			"white",
			"white",
			0,
			TSIZE*(width-currentChain),
			TSIZE*i
		)
		rectObj.visible = false;
		createElement(previousGID,rectObj);
	}
	walls.forEach(
		box => {
			world.addChild(box);
		}
	)
}

function createElement(gid, rect) {
	switch (gid) {
		case 2:
			walls.push(rect);
			break;
	}
}
