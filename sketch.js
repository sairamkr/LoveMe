let r,g,b
let squareSize;
  let lineWidth = 4;

function setup() {
  createCanvas(1920,1080);
  squareSize = random(10,350)
  lineWidth = random (2,10)
  framerate

  
  
}

function draw() {
    r = random(0,255)
    g = random(0,255)
    b = random(0,255)
  background(0,0,0,2)
  squareSize = random(30,100 )
  fill(r,g,b,180)
  //below is for original color
  //fill(225,75,230,180)
  rectMode(CENTER);
  strokeWeight(lineWidth);
  stroke(0)
  rect(mouseX,mouseY,squareSize)
  
}

function mousePressed(){
 background(0)
}