const video = document.getElementById('video');
let emotion = '';
const validEmotions = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];

    
    
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)
    
function startVideo() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => video.srcObject = stream,
      err => console.error(err));
  }
}
    
video.addEventListener('playing', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  var interval = setInterval(async () => {
    let maxProb = 0;
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    const expressions = detections[0].expressions;
    Object.keys(expressions).forEach((key) => {
      if (maxProb <= expressions[key]) {
        maxProb = expressions[key];
        emotion = key;
      }
    });
    const head1 = document.getElementById("heading-1");
    head1.classList.add('hide-content');
    const head2 = document.getElementById("heading-2");
    head2.classList.remove('hide-content');
   
      if (validEmotions.includes(emotion)) {
        if (emotion === 'neutral') {
          window.location.href = "https://open.spotify.com/playlist/6IdR78TOog83PV4XhLDvWN";
          
        } else if (emotion === 'happy') {
          window.location.href = "https://open.spotify.com/playlist/0jrlHA5UmxRxJjoykf7qRY";
          
        } else if (emotion === 'sad') {
          window.location.href = "https://open.spotify.com/playlist/0uQUuQSxkO3tylUSOKnyEB";
          
        } else if (emotion === 'angry') {
          window.location.href = "https://open.spotify.com/playlist/2arRA0sbEqLa09tzEb2qOp";
        
        } else if (emotion === 'fearful') {
          window.location.href = "https://open.spotify.com/playlist/17QX67R2HbfdVBT7TXKi6A";
       
        } else if (emotion === 'disgusted') {
          window.location.href = "https://open.spotify.com/playlist/17QX67R2HbfdVBT7TXKi6A"
     
        } else if (emotion === 'surprised') {
          window.location.href = "https://open.spotify.com/playlist/6IdR78TOog83PV4XhLDvWN";
       
        }
        clearInterval(interval);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      }
    
  }, 100);
});