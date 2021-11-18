var canvas;
var classifier;
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  // Setting the mobile net model
  classifier = ml5.imageClassifier('MobileNet', modelLoaded)
}

function modelLoaded(){
  console.log('MODEL LOADED')
}

function preload(){
  console.log('In the preload funtion')
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResults)
}

function gotResults(error, result){
  if(error){
    console.log(error)
  }
  else {
    // let object = result[0].label;
    let accuracy = (result[0].confidence).toFixed(2);
    var previous_result = result[0].label;
    if((accuracy > 0.5) && (previous_result != result[0].label)) {
      console.log(result)
      let synth = window.speechSynthesis;
      var speakData = result[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakData);
      document.getElementById('object').innerHTML = result[0].label;
      document.getElementById("accuracy").innerHTML = accuracy;
      synth.speak(utterThis)
    }
  }
}
