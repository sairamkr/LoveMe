let password = "love123";
let enteredPassword = "";
let isPasswordCorrect = false;

let bgMusic;
let bg
let isMusicPlaying = false;

let button;
let fullReason = "";
let displayedReason = false;
let currentCharacter = 0;

let passwordInput, submitButton;

// Particle System
let particle = [];
let num = 2; // number of particles per frame

//Song and preloading my song
let song


function preload(){
  song = loadSound("Tele.mp3");
  bg = loadImage("Cover.png")
  bg2 = loadImage("Main.png")
 // customfont = loadFont("Melon.otf")
  let h;
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  textAlign(CENTER, CENTER);
  textFont("font-family","Indie Flower")
  stroke('white')
  textSize(24);
  h = bg
 
  song.play();
  //Password Screen
  passwordInput = createInput();
  passwordInput.position(width / 2 - 100, height / 2 +150);
  passwordInput.style("background-color","white")
  
  
  passwordInput.size(200);

  submitButton = createButton('Submit');
  submitButton.position(width / 2 - 50, height / 2 + 200);
  submitButton.style("font-size", "28px")
  submitButton.style("font-family", "Indie Flower")
  
  // the "color" property sets the text color
  submitButton.style("color", "darkred")
  
  submitButton.style("background-color", "pink")
  submitButton.style("border-color", "red")
  submitButton.style("border-width", "2px")
  
  // the "border-radius" property rounds
  // the edges of the button
  submitButton.style("border-radius", "23px")
  
  
  submitButton.mousePressed(handlePasswordSubmit);
 
  button = createButton('Love Me');
  button.position(width / 2 - 100, height / 2 + 100);
  button.style("font-size", "28px")
  button.style("font-family", "Indie Flower")
  
  // the "color" property sets the text color
  button.style("color", "darkred")
  
  button.style("background-color", "pink")
  button.style("border-color", "red")
  button.style("border-width", "3px")
  
  // the "border-radius" property rounds
  // the edges of the button
  button.style("border-radius", "10px")
  button.mousePressed(showRandomReason);
  x = random(100,250)
  y = random(100,250)
  button.hide();
   
}

function draw() {
 
  background(h);

  // Draw heart particles
  for (let i = particle.length - 1; i >= 0; i--) {
    particle[i].update();
    particle[i].display();

    if (particle[i].done) {
      particle.splice(i, 1);
    }
  }

  fill(0);

  if (!isPasswordCorrect) {
    fill('pink')
    text("Enter Password", width / 2, height / 2 + 120);
 // h = bg2
  }

  if (isPasswordCorrect && displayedReason) {
    h = bg2
    let margin = width * 0.2;
    let textBoxWidth = width - margin * 2;

    let partial = fullReason.substring(0, currentCharacter);
    textAlign(CENTER, CENTER);
    text(partial, width/2-30,height/2-300, 200,400);

    if (currentCharacter < fullReason.length) {
      currentCharacter += 0.5;
    }
  }
}

function handlePasswordSubmit() {
  enteredPassword = passwordInput.value();
  if (enteredPassword === password) {
    isPasswordCorrect = true;
    passwordInput.hide();
    submitButton.hide();
    setupMainInterface();

   
  } else {
    alert("Incorrect Password! Try again.");
  }
}

function setupMainInterface() {
  button.show();
}

function showRandomReason() {
  fill("pink")
  
  fullReason = random(Reasons); // from Reasons.js
  currentCharacter = 0;
  displayedReason = true;
  
}

function mouseMoved() {
  for (let i = 0; i < num; i++) {
    particle.push(new Particle(mouseX, mouseY));
  }
}

// 💖 Heart Particle Class
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.life = 400;
    this.done = false;

    this.color = color(random(220, 255),random(230,255), random(180,230));
    this.size = random(0.1, 0.3);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.life -= 5;
    if (this.life <= 0) {
      this.done = true;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.color);

    beginShape();
    for (let t = 0; t < TWO_PI; t += 0.1) {
      let x = 16 * pow(sin(t), 3);
      let y = - (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
      vertex(x * this.size, y * this.size);
    }
    endShape(CLOSE);
    pop();
  }
}