let img;
let pkgImg;
let pkgs = [];
let score = 0;
let bandwidth = 20;
let speed = 2;
let id;
let pcVec;
let set = false;
let done = false;
let startText = "Don't let the bandwidth hit 0!";
let endText;

function preload(){
  img = loadImage("Computer_vector_icon-512.png");
  pkgImg = loadImage("materials-procurement-icon.png");
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  img.resize(200, 0);
  pkgImg.resize(50, 0);
  pcVec = createVector(windowWidth / 2, windowHeight / 2);
  setTimeout(() => startText = "", 2000);
  id = setInterval(newPkg, 500);
}

function draw() {
  if(!done){
    background(51);
    image(img, windowWidth / 2 - img.width / 2, windowHeight / 2 - img.height / 2);
    for(let pkg of pkgs){
      pkg.move();
      pkg.show();
      if(pkg.collides(img)){
        pkgs.splice(pkgs.indexOf(pkg), 1);
        bandwidth--;
        if(bandwidth <= 0){
          done = true;
          clearInterval(id);
          sleep(50).then(() => {
            background(51);
            displayText();
          });
        }
      }
    }
    noStroke();
    fill(255);
    if(startText != ""){
      textSize(64);
      textAlign(CENTER);
      text(startText, width/2, 100);
    }
    textSize(32);
    textAlign(LEFT);
    text(bandwidth + " GB/s", 10, 30);
    textAlign(RIGHT);
    text(floor(millis() / 1000) + " seconds", width - 10, 30);
  } else {
    if(endText != undefined){
        sleep(500).then(() => {
        noLoop();
        background(51);
        textAlign(RIGHT);
        text(floor(millis() / 1000) + " seconds", width - 10, 30);
        textAlign(CENTER);
        textSize(15);
        fill(183, 88, 69);
        text("You can replay by pressing F5!", 130, 25);
        fill(endText.info.color[0], endText.info.color[1], endText.info.color[2]);
        textSize(endText.info.textSize);
        noStroke();
        let i = -(endText.text.length / 2) * endText.info.offset;
        for(let txt of endText.text){
          text(txt, width/2, height/2 + i);
          i += endText.info.offset;
        }
        textSize(endText.info.sourceSize);
        fill(200);
        text(endText.source, width - 200, height - 30);
      });
    }
  }
}

function newPkg() {
  if(bandwidth > 0){
    speed += score / 80;
    set = false;
    let theta = random(TWO_PI);
    let a = width;
    pkgs.push(new Package(a * cos(theta) + width / 2, a * sin(theta) + height / 2, pcVec, speed, pkgImg));
  }
}

function mousePressed(){
  for(let pkg of pkgs){
    if(pkg.clickedOn(mouseX, mouseY)){
      pkgs.splice(pkgs.indexOf(pkg), 1);
      score++;
      restore();
    }
  }
}

function restore(){
  if(bandwidth > 0 && bandwidth < 20){
    bandwidth++;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function displayText(){
  endText = loadJSON("https://" + location.host + "/text");
}
