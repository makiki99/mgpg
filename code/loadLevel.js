function loadLevel(level) {
	world = g.makeTiledWorld(level,"img/tileset.png");
	player = g.sprite([
		"img/playerL.png",
		"img/playerR.png"
	])
	player.x = world.getObject("player").x;
	player.y = world.getObject("player").y;
	goal = g.sprite("img/goal.png");
	goal.x = world.getObject("goal").x;
	goal.y = world.getObject("goal").y;
	walls = world.getObject("Foreground");
}
