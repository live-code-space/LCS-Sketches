
var tile_size = 15
var angle=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(degrees);
  setupAudio();
}

function draw() {
  background(200);
  updateAudio();

  var col;
  for (var x=0; x<width; x+=tile_size) {
    for (var y=0; y<width; y+=tile_size) {
      if (x/tile_size%2==0) col = y/tile_size%2==0 ? 255 : 0;
      else        col = y/tile_size%2==0 ? 0 : 255;
      noStroke();
      fill(0,0,0,col);
      circle(x,y,tile_size);
      
    }
  }
  
  push();
  
  translate(width/2, height/2);
  rotate(angle);
  var col;
  for (var x=0; x<width; x+=tile_size) {
    for (var y=0; y<width; y+=tile_size) {
      if (x/tile_size%2==0) col = y/tile_size%2==0 ? 255 : 0;
      else        col = y/tile_size%2==0 ? 0 : 255;
      noStroke();
      fill(0,0,0,col);
      circle(x - width/2,y-height,tile_size);
    }
  }
  pop();  
  angle+=.01;
  
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