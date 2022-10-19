song1 = "";
song2 = "";
song1Status = "";
song2Status = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
function setup() {
    canvas = createCanvas(700, 340);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function draw() {
    image(video, 0, 0, 600, 400); 
    stroke("#ffffff");
    fill("#ffffff");
    song1Status = song1.isPlaying(); song2Status = song2.isPlaying();
    if (scoreLeftwrist > 0.2) {
        circle(leftWristx, leftWristy, 20);
        if (song1Status == false) {
            song1.play();
            document.getElementById("name").innerHTML = "SONG NAME: Peter Pan";
        }
        
    }

    if (scoreRightwrist > 0.2) {
        circle(rightWristx, rightWristy, 20);
        if (song2Status == false) {
            song2.play();
            document.getElementById("name").innerHTML = "SONG NAME: Harry Potter theme song";
        }
        
    }
}
function modelLoaded() {
    console.log("Model has loaded");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log(leftWristx, leftWristy, rightWristx, rightWristy);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
    }
}
