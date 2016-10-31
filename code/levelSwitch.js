function nextLevel() {
	if (animation.type == 0) {
		currentLevel++;
	} else {
		return;
	}
	if (currentLevel < levelList.length) {
		animation.type = 1;
		animation.frame = 0;
	} else {
		animation.type = 2;
		animation.frame = 0;
	}
}
