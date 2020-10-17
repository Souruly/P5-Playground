
let scr;

let img;
let hidden = false;
let showButton;

let imageFilesNums = [4, 1, 2, 4, 5, 6, 4, 7, 8, 4];

function preload() {
  let imageFileNum = random(imageFilesNums);
  let imageFile = "assets/composite" + imageFileNum.toString() + ".jpg";
  print(imageFile);
  img = loadImage(imageFile);
}

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  imageMode(CENTER);
  textSize(16);

  scr = new StripedScreen(0, 0.6, 15, 5, 50);

  showButton = createButton("Show Stripes");
  if (hidden) {
    showButton.html("Show Stripes");
  } else {
    showButton.html("Hide Stripes");
  }
  showButton.mousePressed(toggleShow);
  showButton.position(width - 250, 100);
}

function draw() {
  background(255);

  image(img, width / 2, height / 2);

  scr.show();
  if (keyIsPressed === true) {
    if (keyCode === UP_ARROW) {
      scr.update(1);
    } else if (keyCode === DOWN_ARROW) {
      scr.update(-1);
    }
  }

  noStroke();
  fill(0);
  text("Press UP/DOWN Arrow to move stripes.", width - 200, 50, 200, 50);
}

function toggleShow() {
  hidden = !hidden;
  if (hidden) {
    showButton.html("Show Stripes");
    setStripeDecayTimer();
  } else {
    showButton.html("Hide Stripes");
  }
}

function setStripeDecayTimer() {
  console.log("Decaying");
  stripes.forEach((stripe) => {
    stripe.life = 100;
  });
}

function limitVal(a, min, max) {
  if (a < min) {
    return min;
  }
  if (a > max) {
    return max;
  }
  return a;
}

class StripedScreen {
  constructor(x, speed, t1, t2, num) {
    this.x = x;
    this.speed = speed;
    this.t1 = t1;
    this.t2 = t2;
    this.numStripes = num;
    this.stripes = [];
    this.maxLeft = this.t1 * this.n + this.t2 * (this.n - 1);

    for (let i = 0; i < this.numStripes; i++) {
      let s = new Stripe();
      this.stripes.push(s);
    }
  }

  generateScreen() {
    for (let i = 0; i < this.numStripes; i++) {
      let s = new Stripe();
      this.stripes.push(s);
    }
  }

  show() {
    for (let i = 0; i < this.numStripes; i++) {
      let stripeX = this.x + i*(this.t1+this.t2);
      this.stripes[i].show(stripeX, this.t1);
    }
  }

  update(s) {
    this.x += s * this.speed;
    if (this.x > width) {
      this.x = width;
    }
    if (this.x < -this.maxLeft) {
      this.x = -this.maxLeft;
    }
  }
}

class Stripe {
  constructor() {
    this.life = 100;
  }

  show(x, t1) {
    if (hidden) {
      this.life--;
    } else {
      this.life++;
    }
    this.life = limitVal(this.life, 0, 100);
    let aVal = floor(map(this.life, 0, 100, 0, 255));
    fill(192, aVal);
    noStroke();
    rect(x, height / 2, t1, height);
  }
}
