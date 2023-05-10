
var particles=[]
var pSplit=30;
var phase = 1;
var mess = 30000

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	colorMode(HSB);
	noStroke()
	for(var j=0;j<height; j+=pSplit){
			for( var i=0;i<width;i+=pSplit){
				particles.push( {x:i, y:j, myH:noise(i/10,j/10,frameCount/10)}
				)
		}
	}
}


function draw() {
	background(0,0.01);   
	
	for( var k=0; k<particles.length;k++){
		let p = particles[k]
		let radius = map(cos(k + phase), -1, 1, 0, 5);
		fill(p.myH * 360, p.myH * 360,p.myH * 360);
		ellipse(p.x, p.y, radius)
		p.x= p.x + (noise(p.x/100, p.y/100, 1000)-0.5) //-0.5 to 0.5
		p.y= p.y + (noise(p.x/100, p.y/100, mess)-0.5)
	}
	 phase += random(0.005);
}	
