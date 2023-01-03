window.onload = function() {
	var file = document.getElementById("thefile");
	var audio = document.getElementById("audio");

	//set up dimensions of canvas for 2D rendering 
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");
	
	file.onchange = function() {

		//get audio file and play it 
		var files = this.files;
		audio.src = URL.createObjectURL(files[0]);
		audio.load();
		audio.play();

		//create audio context and create source within it 
		var context = new AudioContext();
		var src = context.createMediaElementSource(audio);
		var analyser = context.createAnalyser();

		//connext source to analyzer node
		src.connect(analyser);

		//connect analyzer to destination (output)
		analyser.connect(context.destination);

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

		const center_x = width/2;
		const center_y = height/2;
		const radius = 150;
		
		function renderFrame() {
			requestAnimationFrame(renderFrame);

			//copies the current frequency data into dataArray - results in an array of values between 0 and 255
			analyser.getByteFrequencyData(dataArray);
						
			//sets canvas background color to black 
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, width, height);

			for (var i = 0; i < bufferLength; i++) {

				//var barWidth = (150 / bufferLength) * 1.5;
				var barWidth = 5;
				var barHeight = 400 / dataArray[i] * 1.5;

				console.log('in for loop')

				//divide circle into equal parts
				let rads = Math.PI * 2 / bufferLength;

				// let barHeight = 100;
				// let barWidth = 2;

				let x = center_x + Math.cos(rads * i) * (radius);
				let y = center_y + Math.sin(rads * i) * (radius);
				let x_end = center_x + Math.cos(rads * i)*(radius + barHeight);
				let y_end = center_y + Math.sin(rads * i)*(radius + barHeight);

				//var lineColor = "rgb(" + dataArray[i] + ", " + dataArray[i] + ", " + 230 + ")";

				//medium - big light blue circles 
				if(dataArray[i] <= 30) {
					ctx.beginPath();
					ctx.arc(Math.floor(Math.random()*((width - 0 + 1) + 0)), Math.floor(Math.random()*((height - 0 + 1) + 0)), radius/dataArray[i] * 1.5, 0, 2*Math.PI);
					ctx.strokeStyle = "rgb(" + 173  + ", " + 216 + ", " + 230 + ")";
					ctx.lineWidth = 2;
					ctx.stroke();
				} //small bright red circles  
				else if (dataArray[i] >=30 && dataArray[i] < 70) {
					ctx.beginPath();
					ctx.arc(Math.floor(Math.random()*((width - 0 + 1) + 0)), Math.floor(Math.random()*((height - 0 + 1) + 0)), radius/dataArray[i] * 1.5, 0, 2*Math.PI);
					ctx.strokeStyle = "rgb(" + 230  + ", " + 230 + ", " + 250 + ")";
					ctx.lineWidth = 2;
					ctx.stroke();
				} //small yellowish circles 
				else if(dataArray[i] >= 70 ) {
					ctx.beginPath();
					ctx.arc(Math.floor(Math.random()*((width - 0 + 1) + 0)), Math.floor(Math.random()*((height - 0 + 1) + 0)), radius/dataArray[i] * 1.5, 0, 2*Math.PI);
					ctx.strokeStyle = "rgb(" + 255 + ", " + 105 + ", " + 180 + ")";
					ctx.lineWidth = 2;
					ctx.stroke();
				}
			}
		}

		audio.play();
		renderFrame();
	};
};
    
