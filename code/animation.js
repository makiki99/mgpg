function updateAnimation() {
	switch (animation.type) {
		case 1:
			if (animation.frame == 16) {
				loadLevel(levelList[currentLevel]);
			}
			if (animation.frame < 33) {
				slidingRectangle.x = TSIZE*(animation.frame-16);
			} else {
				world.alpha = 1;
				animation.type = 0;
				animation.frame = 0;
			}
			break;
		case 2:
			if (animation.frame == 90) {
				g.state = end;
			} else {
				world.alpha = 1-(animation.frame/60)
			}
			break;
		default:
			world.alpha = 1;
			animation.type = 0;
			animation.frame = 0;
	}
	animation.frame++;
}
