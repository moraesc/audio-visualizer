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
      }
    }

    audio.play();
    renderFrame();
  };
};
