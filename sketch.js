let numberOfLights = 8;
let lights = [];
let states = [true, false];
let center;
let initialStates = [];
let lastClickFrameCOount = 0;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  frameRate(15);
  center = createVector(300, 300);

  numberOfLights = round(random(3, 15));

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

function draw() {
  background(240);
  noFill();
  stroke(0);
  ellipse(width / 2, height / 2, 10, 10);
  ellipse(width / 2, height / 2, 20, 20);
  ellipse(width / 2, height / 2, 30, 30);
  ellipse(width / 2, height / 2, 50, 50);

  for (let i = 0; i < numberOfLights; i++) {
    lights[i].show();
  }
}

function mousePressed() {
  let clickFrameCount = frameCount;
  if (frameCount - lastClickFrameCOount > 15) {
    lastClickFrameCOount = clickFrameCount;
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
    this.radius = 20;
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
    text(this.number, this.position.x + this.radius, this.position.y);
  }

  update(m) {
    let d = p5.Vector.dist(this.position, m);
    if (d <= 30) {
      // this.state = !this.state;

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
