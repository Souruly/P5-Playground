let stripes = [];
let numberOfStripes = 25;
let t1 = 15;
let t2 = 5;
let img;
let stripeSpeed = 1;
let hidden = false;
let showButton;

let imageFile = "assets/composite.jpg"

function preload() {
  img = loadImage(imageFile);
}

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  imageMode(CENTER);
  textSize(16);

  for (let i = 0; i < numberOfStripes; i++) {
    let stripeX = i * (t1 + t2);
    let s = new Stripe(stripeX);
    stripes.push(s);
  }

  showButton = createButton("Show Stripes");
  if(hidden)
  {
    showButton.html("Show Stripes")
  }
  else
  {
    showButton.html("Hide Stripes")
  }
  showButton.mousePressed(toggleShow);
  showButton.position(width-250,100);
}

function draw() {
  background(255);
  
  image(img, width/2, height/2);
  
  stripes.forEach((s) => {
    if (hidden == false) {
      s.show();
    }
    if (keyIsPressed === true) {
      if (keyCode === UP_ARROW) {
        s.update(1);
      } else if (keyCode === DOWN_ARROW) {
        s.update(-1);
      }
    }
  });

  noStroke();
  fill(0);
  text("Press UP/DOWN Arrow to move stripes.", width-200,50,200,50);
}

function toggleShow()
{
  hidden = !hidden;
  if(hidden)
  {
    showButton.html("Show Stripes")
  }
  else
  {
    showButton.html("Hide Stripes")
  }
}

class Stripe {
  constructor(x) {
    this.x = x;
    this.speed = 0.5;
  }

  show() {
    fill(192);
    noStroke();
    rect(this.x, height/2, t1, height);
  }

  update(s) {
    this.x += s*this.speed;
    if (this.x > width+t1/2) {
      this.x = -t1/2;
    }
    if (this.x < -t1/2) {
      this.x = width+t1/2;
    }
  }
}
