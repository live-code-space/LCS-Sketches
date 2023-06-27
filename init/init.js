function setup() {
	createCanvas(windowWidth, windowHeight)
	colorMode(HSB)
	setupAudio()
}

function draw() {
	background(0,0,0,1.0)
	updateAudio()	
	
	
}










/* AUDIO INIT 
ampStereo.l
ampStereo.r
ampEase
waveform
fft
peakDetect.isDetected */

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
	peak= new p5.PeakDetect();
}

function updateAudio() {
	fftRaw.analyze()
	peak.update(fftRaw);
	amp = mic.getLevel() * 1000 // average mixed amplitude
	ampStereo.l = mic.amplitude.getLevel(0) * 500 // average left amplitude
	ampStereo.r = mic.amplitude.getLevel(1) * 500 // average right amplitude
	ampEase = ease(amp, ampEase, 0.075) // smooth 'amp'
	waveform = fftRaw.waveform() // array (-1, 1)
	fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)) // array (0, 255)
}