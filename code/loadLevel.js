function loadLevel(level) {
	levelInfo.content = "Level " + (currentLevel+1);
	if (world !== undefined) {
		g.remove(world);
	}
	world = g.makeTiledWorld(level,"img/tileset.png");
	loadPlayer();
	player.x = world.getObject("player").x;
	player.y = world.getObject("player").y;
	world.addChild(player);
	worldData = [];
	let height = world.getObject("World").height/TSIZE;
	let width = world.getObject("World").width/TSIZE;
	for (let x = 0; x < width; x++) {
		worldData.push([]);
		for (let y = 0; y < height; y++) {
			worldData[x].push(world.getObject("World").data[width*y+x]);
		}
	}
	cam = g.worldCamera(world);
	camLayer.addChild(world);
}
