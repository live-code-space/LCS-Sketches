
let flip = 0;
let obj, pg, myfont

function preload() { 
  obj = loadModel('include/model.obj')
  myfont = loadFont('include/IBMPlexSans.ttf')
} 

function setup() { 
  createCanvas(windowWidth, windowHeight, WEBGL)
  pg = createGraphics(width, height)
  background(0);
  strokeWeight(1)
} 
  
function draw() {
	background(0);
	orbitControl(15);
	if (flip == 1) scale(1, -1);
	//clear()
	
	stroke(25, 219, 198)

	rotateZ(PI)
	rotateY(radians(frameCount / 2))
	scale(10)
	translate(-60,0)

	for (let i =0; i < 5; i++) {
		push()
		translate(i* 30,0)
		model(obj)
		pop()
	} 
	
	pg.clear()
	pg.push()
	pg.background(9, 61, 148 )
	pg.translate(pg.width, pg.height)
	pg.rotate(radians(120))
	pg.textAlign(RIGHT, CENTER)
	pg.randomSeed(2)
	
	for(let i = 0; i < 300; i++) {
		let txtSize = 100
		let x = (pg.random(pg.width)+frameCount) % (pg.width + txtSize) - pg.width/2
		let y = i * 30
		pg.textSize(50)
		pg.fill(255)
		pg.textFont(myfont)
		pg.scale(1,-1)
		pg.text('HOW WHAT WHY', x, y)
	}
	pg.pop()
	texture(pg)
} 

