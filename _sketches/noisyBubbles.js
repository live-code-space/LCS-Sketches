
let gap = 50;
let circles = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  //noLoop()

  /* 	for(let i = gap; i < width - d; i += gap) {
		for(let j = gap-d; j < height -d; j += gap) {
			circles.push(new PointCircle(d, i, j));
		}
	} */

  for (let i = 0; i < width / gap; i++) {
    circles.push(new PointCircle(random(50,100)));
  }
}

function draw() {
  background(0,10);

  for (let i = 0; i < circles.length; i++) {
    circles[i].draw();
    circles[i].move();
    circles[i].joinParticles(circles.slice(i));
  
  }
}

class PointCircle {
  constructor(d, x, y) {
    this.d = d;
    this.x = random(0, width);
    this.y = random(0, height);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-3, 3);
  }

  draw() {
    push();
    translate(this.x, this.y);
    for (let i = 0; i < 1000; i++) {
      stroke(255);
      strokeWeight(1);
      let a = random(TWO_PI);
      let r = this.d * (1 - random(random(random(random()))));
      point(cos(a) * r, sin(a) * r );
    }
    pop();
  }

  move() {
    if (this.x < 0 || this.x > width-this.d/2) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height-this.d/2) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis < this.d + element.d) {
        stroke(255);
        strokeWeight(2);
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}
