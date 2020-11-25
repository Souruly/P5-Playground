let numberOfBubbles = 100;

let bx, by;
let bubbles = [];
let minBubbleSize = 2,
  maxBubbleSize = 48;

let maxWindSpeed = 1;
let wind;
let windNoiseHandler = 0;

function resetSketch() {
  createCanvas(windowWidth, windowHeight);
  
  bx = 0;
  by = 3*height/4;

  bubbles = [];
  for (let i = 0; i < numberOfBubbles; i++) {
    let bs = round(random(minBubbleSize,maxBubbleSize));
    let b = new Bubble(bx, by, bs);
    bubbles.push(b);
  }
}

function setup() {
  ellipseMode(RADIUS);

  resetSketch();
}

function draw() {
  background(240);
  windNoiseHandler += 0.01;
  
 for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
    bubbles[i].update();
    // text(bubbles[i].size, width-50, (i+1)*50);
  }
}

function windowResized() {
  resetSketch();
}

function mousePressed()
{
  bubbles.forEach(b => {
    b.poke(mouseX, mouseY);
  });
}