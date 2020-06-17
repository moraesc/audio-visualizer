window.onload = function() {

	//set up dimensions of canvas for 2D rendering 
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");

	startRecording = function() {
		console.log('in start recording function')

		if(navigator.mediaDevices) {

			var constraints = { audio: true };
			var audioCtx = new AudioContext();

			navigator.mediaDevices.getUserMedia(constraints)
			.then(function(stream) {
				var mediaRecorder = new MediaRecorder(stream);
				// visualize(stream);

				mediaRecorder.start();
				console.log('media recorder state: ', mediaRecorder.state);
				console.log('recorder started');

				audio.src = stream;

				var source = audioCtx.createMediaStreamSource(stream);
				var analyser = audioCtx.createAnalyser();
				source.connect(analyser);
				analyser.connect(audioCtx.destination);


				analyser.fftSize = 256;

				//set bufferLength equal to the number of data values for the visualization
				var bufferLength = analyser.frequencyBinCount;
				//var bufferLength = analyser.fftSize;
				console.log('buffer length: ', bufferLength)
		
				//create unsigned byte array (values between 0 and 255) from bufferLength 
				var dataArray = new Uint8Array(bufferLength);
				console.log('data array: ', dataArray)

				//set up canvas 
				var width = canvas.width;
				var height = canvas.height;

				const radius = 150;
		
			function renderFrame() {
				requestAnimationFrame(renderFrame);

				//copies the current frequency data into dataArray - results in an array of values between 0 and 255
				analyser.getByteFrequencyData(dataArray);
							
				//sets canvas background color to black 
				ctx.fillStyle = "#000";
				ctx.fillRect(0, 0, width, height);

				for (var i = 0; i < bufferLength*2; i++) {

					console.log('data array: ', dataArray[i])

					//small light blue circles 
					if(dataArray[i] <= 50) {
						ctx.beginPath();
						ctx.arc(Math.floor(Math.random()*((width - 0 + 1) + 0)), Math.floor(Math.random()*((height - 0 + 1) + 0)), 10, 0, 2*Math.PI);
						ctx.strokeStyle = "rgb(" + 173  + ", " + 216 + ", " + 230 + ")";
						ctx.lineWidth = 2;
						ctx.stroke();
					} //medium pink circles
					else if (dataArray[i] >= 50 && dataArray[i] < 70) {
						ctx.beginPath();
						ctx.arc(Math.floor(Math.random()*((width - 0 + 1) + 0)), Math.floor(Math.random()*((height - 0 + 1) + 0)), 50, 0, 2*Math.PI);
						// ctx.strokeStyle = "rgb(" + 255  + ", " + 255 + ", " + 0 + ")";
						ctx.strokeStyle = "rgb(" + 255  + ", " + 192 + ", " + 203 + ")";
						ctx.lineWidth = 2;
						ctx.stroke();
					} //big hot pink circles 
					else if(dataArray[i] >= 120 ) {
						ctx.beginPath();
						ctx.arc(Math.floor(Math.random()*((width - 0 + 1) + 0)), Math.floor(Math.random()*((height - 0 + 1) + 0)), 140, 0, 2*Math.PI);
						ctx.strokeStyle = "rgb(" + 255 + ", " + 20 + ", " + 147 + ")";
						ctx.lineWidth = 2;
						ctx.stroke();
					}
		
				}
		}
		renderFrame();
				
			})
		}
	}

}