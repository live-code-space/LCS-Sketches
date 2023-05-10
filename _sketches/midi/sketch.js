import * as midi from './midi.js';

function setup() {
	createCanvas(windowWidth, windowHeight)
	setupMidi(midi.midiDeviceIn, midi.midiDeviceOut);
}

function draw() {
	push()
	noStroke()
	fill(midi.controlChange.w * 2)
	rectMode(CENTER)
	rect(midi.controlChange.w, height / 2, width / 128, midi.controlChange.h)
	pop()
}