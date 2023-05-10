export let midiDeviceIn = 0 // [ID] or "device name"
export let midiDeviceOut = 0 // [ID] or "device name"
export let midiThru = false // optionally pass all in -> out

//let loadScripts = ["includes/js/webmidi.min.js"]
let midiInput, midiOutput, midiMsg = {}

export function noteOn(note) {
	// use note.type, .channel, .name, .number, .octave, .velocity
	let x = map(note.number, 0, 127, 0, width)
	let y = map(note.velocity, 0, 127, 0, height)
	return x,y;
	
}

export  function noteOff(note) {
	// use note.type, .channel, .name, .number, .octave, .velocity
}

export  function pitchBend(pitch) {
	// use pitch.type, .channel, .value
}

export function controlChange(control) {
	// use control.type, .channel, .controllerNumber, .controllerName, .value
	let h = map(control.controllerNumber, 0, 127, 0, width)
	let w = map(control.value, 0, 127, 0, width/2)
	return h,w;
}

export function midiToFreq(noteNumber) {
	return 440 * Math.pow(2, (noteNumber - 69) / 12)
}


export  function parseMidi(mm) {
	//print(mm)
	if(mm.note != undefined) {
		switch (mm.note.type) {
			case 'noteon':
				noteOn(mm.note)
				break;
			case 'noteoff':
				noteOff(mm.note)
				break;
			case 'controlchange':
				controlChange(mm.note)
				break;
		}
	} else if(mm.pitch != undefined) {
		pitchBend(mm.pitch)
	} else if(mm.control != undefined) {
		controlChange(mm.control)
	}
}

export function setupMidi(idIn, idOut) {
	WebMidi.enable(function(err) {
		if(err) {
			console.log("WebMidi could not be enabled.", err);
		}

		// Print to console available MIDI in/out id/names
		WebMidi.inputs.forEach(function(element, c) {
			print("in  \[" + c + "\] " + element.name)
		});
		WebMidi.outputs.forEach(function(element, c) {
			print("out \[" + c + "\] " + element.name)
		});

		// assign in channel:
		if(typeof idIn === 'number') {
			midiInput = WebMidi.inputs[idIn]
		} else {
			midiInput = WebMidi.getInputByName(idIn)
		}

		if(typeof idOut === 'number') {
			midiOutput = WebMidi.outputs[idOut]
		} else {
			midiOutput - WebMidi.getOutputByName(idOut)
		}

		midiInput.addListener('midimessage', 'all', function(e) {
			if(midiThru) {
				if(e.data.length == 3) {
					midiOutput.send(e.data[0], [e.data[1], e.data[2]])
				} else {
					midiOutput.send(e.data[0])
				}
			}
			midiMsg = {}
			midiMsg.data = e.data
			midiMsg.timestamp = e.timestamp
			// parseMidi(midiMsg) // optionally send raw only
		})

		// noteOn
		midiInput.addListener('noteon', "all", function(e) {
			let note = {
				type: 'noteon'
			}
			note.channel = e.channel
			note.number = e.note.number
			note.name = e.note.name
			note.octave = e.note.octave
			note.velocity = floor(127 * e.velocity)

			midiMsg.note = note
			parseMidi(midiMsg)
		})

		// noteOff
		midiInput.addListener('noteoff', "all", function(e) {
			let note = {
				type: 'noteoff'
			}
			note.channel = e.channel
			note.number = e.note.number
			note.name = e.note.name
			note.octave = e.note.octave
			note.velocity = 0

			midiMsg.note = note
			parseMidi(midiMsg)
		})

		// pitchBend
		midiInput.addListener('pitchbend', "all", function(e) {
			let pitch = {
				type: 'pitchbend'
			}
			pitch.channel = e.channel
			pitch.value = floor(127 * e.value)

			midiMsg.pitch = pitch
			parseMidi(midiMsg)
		})

		// controlChange
		midiInput.addListener('controlchange', "all", function(e) {
			let control = {
				type: 'controlchange'
			}
			control.channel = e.channel
			control.controllerNumber = e.controller.number
			control.controllerName = e.controller.name
			control.value = e.value

			midiMsg.control = control
			parseMidi(midiMsg)
		})

	})
}