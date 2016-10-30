function updateTimer() {
	frameCount++;
	// warning - oneliners ahead!
	let ms = "" + Math.floor(frameCount*1000/60)%1000;
	let s = "" + Math.floor(frameCount/60)%60;
	let min = "" + Math.floor(frameCount/3600);
	ms = "000".substring(0, 3 - ms.length) + ms;
	s = "00".substring(0, 2 - s.length) + s;
	timer.content = min+":"+s+"."+ms;
	timer.x = TSIZE*15.5-timer.width;
}
