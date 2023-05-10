var xoff = 0;
var yoff = 200;

function setup() {
    createCanvas(windowWidth, windowHeight)
    stroke(0,0,255,10);
    strokeWeight(1);
    background(0)
    noCursor()
    setupAudio();
}

function draw() {
	updateAudio();
    background(0,20);
    
    for (i=0; i<1200; i++){
    	var mx = map(mouseX, 0, width, 0, 1)
    	var my = map(mouseY, 0, height, 0, 1)
        var x = map(noise(mx + xoff+(i/100)), 0, 1, 0, width);
        var y = map(noise(my + yoff+(i/100)), 0, 1, 0, height);
        fill(80-i/10, 10-i/10);
        circle(x+i/200, y+i/200, i/ampEase*5)
    }
    
    
    xoff += 0.002;
    yoff -= 0.003;
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