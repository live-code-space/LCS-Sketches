
let obj
let angle = 0;
let inc = 0.0;

function preload() {
	obj = loadModel('include/model.obj')
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	noFill()
	//strokeWeight(0)
	stroke(244, 244, 237)
}

function draw() {
	background(0);
	orbitControl(5)
	rotateY(radians(-frameCount / 2))
	
	
	strokeWeight(1)
	scale(-20)

	//model(obj)
	var sc = map(sin(angle), -1, 1, 0.5, 1.2)
	//sc = noise(inc) * sc
	
	beginShape();

	for(let v of obj.vertices) {
		push();

		stroke(128, 147, 241)
		line(v.x, v.y, v.z, v.x * sc , v.y * sc  , v.z * sc);
		stroke(179, 136, 235)
		strokeWeight(3)
		point(v.x * sc, v.y * sc, v.z * sc);
	
		pop();
	}

	endShape();
	inc -= 0.01;
	angle += 0.02
}