

var deg, ang;
var x = 100;
var y = 10;
var x2 = 200;
var y2 = 20;
var rad = -30;
var dista = 500;
var nScale = 20;
var rotateBy = 0;
var incr = 2;

function setup() {
  createCanvas(windowWidth, windowHeight) 
  background(0);
  noStroke();
}

function draw() {

  background(20, 20, 80, 10);
 fill(random(0, 255), 255, 255);
  
 
  push();
  translate(width/2, height/2);
  rotate(rotateBy);
 
  deg = 0;
  for (let i = 0; i<=360; i+=incr) {
  	deg += incr;
    ang = radians(deg);
    
    x = cos(ang) * (rad + (dista * noise(y/100, nScale)));
    y = sin(ang) * (rad + (dista * noise(x/200, nScale)));
    ellipse(x, y, 2, 2);
    
    x2 = sin(ang) * (rad * 40 + (dista  * noise(y2/400, nScale *5)));
    y2 = cos(ang) * (rad * 40 + (dista * noise(x2/800, nScale * 10)));
    ellipse(x2, y2, 1, 1);
  }
  
  nScale += .01;
  pop();
  
 rotateBy += .003;
}