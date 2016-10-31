function nextLevel() {
	loadLevel(levelList[currentLevel]);
}

function endGame() {
	g.state = end;
}
