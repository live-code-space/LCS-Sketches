let x, y, s

function setup() {
	createCanvas(windowWidth, windowHeight)
	noCursor()
	background(0)
	setupAudio()
	noFill()
}

function draw() {
	updateAudio()
	background(0, 5)
	x = noise(frameCount * .002) * width
	y = noise(frameCount * .001) * height
	s = noise(frameCount * 0.5) * amp

	for(let i = 0; i < waveform.length; i++) {
		let freq = waveform[i] * height / 4 
		let recolor = map(freq, -1, 1, 0, 255)
		console.log(freq)
		stroke(recolor)
	}
	
	ellipse(x, y, s*4)

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