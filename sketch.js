let numberOfLights = 8;
let lights = [];
let states = [true, false];
let center;
let initialStates = [];
let lastClickFrameCount = 0;
let playButton;
let numberSlider;
let gameState = 0;

function generateGame() {
  lights = [];
  initialStates = [];

  numberOfLights = numberSlider.value();

  let radius = createVector(200, 0);
  for (let i = 0; i < numberOfLights; i++) {
    let position = p5.Vector.add(center, radius);
    let state = random(states);
    let l = new Light(position.x, position.y, state, i + 1);
    lights.push(l);
    initialStates.push(state);
    radius.rotate(floor(360 / numberOfLights));
  }

  console.log(initialStates);
}

function startPuzzle() {
  gameState = 1;
  playButton.hide();
  numberSlider.hide();
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  ellipseMode(RADIUS);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  center = createVector(300, 300);

  numberSlider = createSlider(3, 20, 8);
  numberSlider.position(400, 50);
  numberSlider.changed(generateGame);

  playButton = createButton("Start");
  playButton.position(450, 500);
  playButton.mousePressed(startPuzzle);

  generateGame();
}

function draw() {
  background(240);

  for (let i = 0; i < numberOfLights; i++) {
    lights[i].show();
  }

  textSize(20);
  text("+", width/2, height/2);
  text("Lights : " + str(numberSlider.value()), 450, 40);
}

function mousePressed() {
  let clickFrameCount = frameCount;
  if (frameCount - lastClickFrameCount > 15) {
    lastClickFrameCount = clickFrameCount;
    let m = createVector(mouseX, mouseY);
    for (let i = 0; i < numberOfLights; i++) {
      lights[i].update(m);
    }
  }
}

class Light {
  constructor(x, y, state, n) {
    this.position = createVector(x, y);
    this.state = state;
    this.number = n;
    this.radius = 10;
  }

  show() {
    if (this.state == true) {
      fill(255, 255, 0);
    } else {
      fill(51);
    }
    stroke(0);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
    noStroke();
    fill(0);
    textSize(15);
    text(this.number, this.position.x + this.radius + 10, this.position.y);
  }

  update(m) {
    let d = p5.Vector.dist(this.position, m);
    if (d <= this.radius) {
      if (gameState == 0) {
        this.state = !this.state;
      } else {
        let ind = this.number - 1;
        let prev = ind - 1;
        let next = ind + 1;
        if (prev < 0) {
          prev = numberOfLights - 1;
        }

        if (next >= numberOfLights) {
          next = 0;
        }

        lights[prev].state = !lights[prev].state;
        lights[next].state = !lights[next].state;
      }
    }
  }
}
