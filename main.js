video="";
function preload() {
    video=createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw() {
    image(video,0,0,480,380);
    if (status!="") {
        objectdetector.detect(video,gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status: objects detected";
            document.getElementById("num_of_objects").innerHTML="number of objects: "+objects.length;
            percent=floor(objects[i].confidence * 100);
            fill("purple");
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("purple");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start() {
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status- Detecting objects";
}

status="";

function modelLoaded() {
    console.log("Model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

objects=[];

function gotResult(error,results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects=results;
    }
}
