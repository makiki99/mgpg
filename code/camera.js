function updateCamera() {
	cam.x = player.x-TSIZE*7.5;
	cam.y = player.y-TSIZE*7.5;
	if (cam.x < 0) {
		cam.x = 0;
	}
	if (cam.y < 0) {
		cam.y = 0;
	}
	if (cam.x > world.getObject("World").width-TSIZE*16) {
		cam.x = world.getObject("World").width-TSIZE*16;
	}
	if (cam.y > world.getObject("World").height-TSIZE*16) {
		cam.y = world.getObject("World").height-TSIZE*16;
	}
	cam.x = Math.floor(cam.x);
	cam.y = Math.floor(cam.y);
}
