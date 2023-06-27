let step = 200;
let title =["Dead Encoding","Live Coding","Dead Encoding","Live Coding", "Dead Encoding","Live Coding"]

let c = 0;
let angle = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  setupAudio()
  rectMode(CENTER)
  textAlign(CENTER, CENTER)
  textSize(150)
  textFont("Avenir")
}

function draw() {
  background(0, 1);
  updateAudio()

  noFill();

  for (let d = 0; d<width; d+=width/step){
  	for (let f = 100; f<height; f+=200){
  	drawingContext.save();
  	fill(0,10)
  
  	rect(d, 0, width/step, height * 2)
  	fill(0,255,0)
  	drawingContext.clip()
  	//drawingContext.globalCompositeOperation = "difference"
 	stroke(160,0,200)
 	strokeWeight(2)
  	text(title[c], width/2 + 100 * tan(frameCount * 0.01 + 0.5 * noise(d)), f)
  	drawingContext.restore();
  	}
  }
  
  if(frameCount%60 == 0){
  	if(c < title.length - 1){
  		c++
  	}else {
  		c= 0
  	}
  }
}


/* AUDIO INIT */
let mic, fftRaw, fft = [],
	waveform = [],
	amp = 0.0,
	ampStereo = {
		l: 0.0,
		r: 0.0
	},
	ampEase = 0.0,
	numBins = 512,
	bands = 12

function setupAudio() {
	userStartAudio()
	mic = new p5.AudioIn()
	mic.start()
	fftRaw = new p5.FFT(0.75, numBins)
	fftRaw.setInput(mic)
}

function updateAudio() {
	fftRaw.analyze()
	amp = mic.getLevel() * 1000 // average mixed amplitude
	ampStereo.l = mic.amplitude.getLevel(0) * 500 // average left amplitude
	ampStereo.r = mic.amplitude.getLevel(1) * 500 // average right amplitude
	ampEase = ease(amp, ampEase, 0.075) // smooth 'amp'
	waveform = fftRaw.waveform() // array (-1, 1)
	fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)) // array (0, 255)
}
