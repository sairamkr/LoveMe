let password = "donuts";
let enteredPassword = "";
let isPasswordCorrect = false;

let bgMusic;
let bg;
let isMusicPlaying = false;

let button;
let fullReason = "";
let displayedReason = false;
let currentCharacter = 0;
let isTyping = false;

let passwordInput, submitButton;

let particle = [];
let num = 2;

let song;
let Typing;
let Click;
let bg2;

function preload() {
  Click = loadSound("mouse-click-290204.mp3");
  Typing = loadSound("keyboard-typing-5997.mp3");
  song = loadSound("Tele.mp3");
  bg = loadImage("Cover.png");
  bg2 = loadImage("Main.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  textAlign(CENTER, CENTER);
  textFont("Indie Flower");
  stroke('white');
  textSize(24);
  h = bg;

  song.play();

  passwordInput = createInput();
  passwordInput.position(width / 2 - 100, height / 2 + 150);
  passwordInput.style("background-color", "white");
  passwordInput.size(200);

  submitButton = createButton('Open');
  submitButton.position(width / 2 - 50, height / 2 + 200);
  submitButton.style("font-size", "28px");
  submitButton.style("font-family", "Indie Flower");
  submitButton.style("color", "darkred");
  submitButton.style("background-color", "pink");
  submitButton.style("border-color", "red");
  submitButton.style("border-width", "2px");
  submitButton.style("border-radius", "23px");
  submitButton.mousePressed(() => {
    Click.play();
    handlePasswordSubmit();
  });

  button = createButton('Love Me');
  button.position(width / 2 - 100, height / 2 + 100);
  button.style("font-size", "28px");
  button.style("font-family", "Indie Flower");
  button.style("color", "darkred");
  button.style("background-color", "pink");
  button.style("border-color", "red");
  button.style("border-width", "3px");
  button.style("border-radius", "10px");
  button.mousePressed(() => {
    Click.play();
    showRandomReason();
  });

  button.hide();
}

function draw() {
  background(h);

  for (let i = particle.length - 1; i >= 0; i--) {
    particle[i].update();
    particle[i].display();
    if (particle[i].done) {
      particle.splice(i, 1);
    }
  }

  fill(0);

  if (!isPasswordCorrect) {
    fill('pink');
    text("Enter Password", width / 2, height / 2 + 120);
  }

  if (isPasswordCorrect && displayedReason) {
    h = bg2;
    let margin = width * 0.2;
    let textBoxWidth = width - margin * 2;

    let partial = fullReason.substring(0, currentCharacter);
    textAlign(CENTER, CENTER);
    text(partial, width / 2 - 30, height / 2 - 300, 200, 400);

    if (currentCharacter < fullReason.length) {
      currentCharacter += 0.2;
      if (!isTyping) {
        isTyping = true;
        Typing.setLoop(false);
        Typing.play();
      }
    } else {
      if (isTyping) {
        Typing.stop();
        isTyping = false;
      }
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
  if (!isTyping) {
    fullReason = random(Reasons); // assumes Reasons.js is loaded
    currentCharacter = 0;
    displayedReason = true;
    isTyping = false; // triggers Typing sound in draw()
  }
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
    this.life = 3000;
    this.done = false;

    this.color = color(random(220, 255), random(230, 255), random(180, 230));
    this.size = random(0.1, 0.5);
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
      let y = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
      vertex(x * this.size, y * this.size);
    }
    endShape(CLOSE);
    pop();
  }
}