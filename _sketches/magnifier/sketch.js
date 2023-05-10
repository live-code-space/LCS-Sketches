
let font
let points = [];

let str = "GET IN TOUCH"

function preload() {
  font = loadFont("assets/NeueMetanaNext-SemiBold.otf");
 
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  
  
  
  for(i = 0; i < str.length; i ++){
  points[i] = font.textToPoints(str[i], window.innerWidth/7.5 + i * 50, window.innerHeight/2, windowWidth/9.5, {
    sampleFactor: 1,
    simplyThreshold: 1,
  })
  }
}

function draw() {
  background("white")
  
  fill('#000099')
  noStroke()

  for(i = 0; i < points.length; i ++){
    beginShape();
  points[i].forEach(point => {
    const distance = createVector(point.x - mouseX, point.y - mouseY)
    const distortion = distance.mult(60 / distance.mag())

    curveVertex(point.x + distortion.x, point.y + distortion.y)
  })
    endShape();
  }
}
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  //canvas.size(w,h);
  width = w;
  height = h;
}; 