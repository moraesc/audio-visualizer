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

					// if(dataArray[i] >= 30 && dataArray[i] <=50) {
					// 	ctx.beginPath();
					// 	ctx.strokeStyle = "rgb(" + 173  + ", " + 216 + ", " + 230 + ")";
					// 	ctx.moveTo(0, height/2);
					// 	// ctx.bezierCurveTo(0,height/2,600,400,width,height/2);
					// 	ctx.bezierCurveTo(0,height/2,600,height/2,width,height/2);
					// 	ctx.stroke();
					// } else 
					if(dataArray[i] > 50 && dataArray[i] <= 70) {
						ctx.beginPath();
						ctx.strokeStyle = "rgb(" + 255  + ", " + 130 + ", " + 0 + ")";
						ctx.moveTo(0, height/2);
						// ctx.bezierCurveTo(0,height/2,600,400,width,height/2);
						ctx.bezierCurveTo(0,height/2,600,dataArray[i]*10,width,height/2);
						ctx.stroke();
					}
					else if(dataArray[i] > 70 && dataArray[i] < 100) {
						ctx.beginPath();
						ctx.strokeStyle = "rgb(" + 255  + ", " + 216 + ", " + 230 + ")";
						ctx.moveTo(0, height/2);
						// ctx.bezierCurveTo(0,height/2,600,400,width,height/2);
						ctx.bezierCurveTo(0,height/2,600,dataArray[i]*10,width,height/2);
						ctx.stroke();
					}
					else if(dataArray[i] > 150) {
						ctx.beginPath();
						ctx.strokeStyle = "rgb(" + 20  + ", " + 216 + ", " + 230 + ")";
						ctx.moveTo(0, height/2);
						// ctx.bezierCurveTo(0,height/2,600,400,width,height/2);
						ctx.bezierCurveTo(0,height/2,600,dataArray[i]*7,width,height/2);
						ctx.stroke();

						ctx.beginPath();
						ctx.strokeStyle = "rgb(" + 255  + ", " + 130 + ", " + 0 + ")";
						ctx.moveTo(0, height/2);
						// ctx.bezierCurveTo(0,height/2,600,400,width,height/2);
						ctx.bezierCurveTo(0,height/2,600,dataArray[i]*8,width,height/2);
						ctx.stroke();

						// ctx.beginPath();
						// ctx.strokeStyle = "rgb(" + 20  + ", " + 216 + ", " + 230 + ")";
						// ctx.moveTo(0, height/2);
						// // ctx.bezierCurveTo(0,height/2,600,400,width,height/2);
						// ctx.bezierCurveTo(0,height/2,600, -dataArray[i],width,height/2);
						// ctx.stroke();
					}
				}
		}
		renderFrame();
				
			})
		}
	}

}