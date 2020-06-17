window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  
  file.onchange = function() {
    //set up dimensions of canvas for 2D rendering 
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

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

    var barWidth = (width / bufferLength) * 1.5;
    var barHeight;
    var x = 0;
    

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      //copies the current frequency data into dataArray - results in an array of values between 0 and 255
      analyser.getByteFrequencyData(dataArray);
            
      //sets canvas background color to black 
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      for (var i = 0; i < bufferLength; i++) {

        console.log(dataArray[i])
        
        barHeight = dataArray[i] * 4;
				
        var r = barHeight + (25 * (i/bufferLength));
        var g = 200 * (i/bufferLength);
        var b = 500;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;

				// if(dataArray[i] > 170) {
				// 	barHeight = dataArray[i] * 4;
				
				// 		var r = barHeight + (25 * (i/bufferLength));
				// 		var g = 200 * (i/bufferLength);
				// 		var b = 500;

				// 		ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
				// 		ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

				// 		x += barWidth + 1;
				// }
				// else {
				// 	console.log(i)
				// 	barHeight = dataArray[i] * 3;
					
					
				// 	var r = barHeight + (25 * (i/bufferLength));
				// 	var g = 350 * (i/bufferLength);
				// 	var b = 1900;

				// 	ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
				// 	ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

				// 	x += barWidth + 1;
				// }

      }
    }

    audio.play();
    renderFrame();
  };
};




// // set to the size of device
// canvas = document.getElementById("renderer");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// ctx = canvas.getContext("2d");

// // find the center of the window
// center_x = canvas.width / 2;
// center_y = canvas.height / 2;
// radius = 150;

// //draw a circle
// ctx.beginPath();
// ctx.arc(center_x,center_y,radius,0,2*Math.PI);
// ctx.stroke();

// for(var i = 0; i < bars; i++){

// 		//divide a circle into equal parts
// 		rads = Math.PI * 2 / bars;

// 		bar_height = 100;
// 		bar_width = 2;

// 		x = center_x + Math.cos(rads * i) * (radius);
// y = center_y + Math.sin(rads * i) * (radius);
// 		x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
// 		y_end = center_y + Math.sin(rads * i)*(radius + bar_height);

// 		//draw a bar
// 		drawBar(x, y, x_end, y_end, bar_width);

// }

// var canvas, ctx, center_x, center_y, radius, bars, 
//     x_end, y_end, bar_height, bar_width,
//     frequency_array;
 
// bars = 200;
// bar_width = 2;
 
// function initPage(){
    
//     audio = new Audio();
//     context = new (window.AudioContext || window.webkitAudioContext)();
//     analyser = context.createAnalyser();
    
//     audio.src = "./assets/hvar.mp3"; // the source path
//     source = context.createMediaElementSource(audio);
//     source.connect(analyser);
//     analyser.connect(context.destination);
 
    
//     frequency_array = new Uint8Array(analyser.frequencyBinCount);
    
//     audio.play();
//     animationLooper();
// }
 
// function animationLooper(){

// 	console.log('in animation looper function')
    
//     // set to the size of device
//     canvas = document.getElementById("renderer");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx = canvas.getContext("2d");
    
//     // find the center of the window
//     center_x = canvas.width / 2;
//     center_y = canvas.height / 2;
//     radius = 150;
    
//     // style the background
//     var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
//     gradient.addColorStop(0,"rgba(35, 7, 77, 1)");
//     gradient.addColorStop(1,"rgba(204, 83, 51, 1)");
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0,0,canvas.width,canvas.height);
    
//     //draw a circle
//     ctx.beginPath();
//     ctx.arc(center_x,center_y,radius,0,2*Math.PI);
//     ctx.stroke();
    
//     analyser.getByteFrequencyData(frequency_array);
//     for(var i = 0; i < bars; i++){
        
//         //divide a circle into equal parts
//         rads = Math.PI * 2 / bars;
        
//         bar_height = frequency_array[i]*0.7;
        
//         // set coordinates
//         x = center_x + Math.cos(rads * i) * (radius);
// 	y = center_y + Math.sin(rads * i) * (radius);
//         x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
//         y_end = center_y + Math.sin(rads * i)*(radius + bar_height);
        
//         //draw a bar
//         drawBar(x, y, x_end, y_end, bar_width,frequency_array[i]);
    
//     }
//     window.requestAnimationFrame(animationLooper);
// }
 
// // for drawing a bar
// function drawBar(x1, y1, x2, y2, width,frequency){
    
//     var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
    
//     ctx.strokeStyle = lineColor;
//     ctx.lineWidth = width;
//     ctx.beginPath();
//     ctx.moveTo(x1,y1);
//     ctx.lineTo(x2,y2);
//     ctx.stroke();
// }


