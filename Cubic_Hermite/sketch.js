let a, b;
let pm1, pm2;
let maxTime = 400;
let gameFrameCount = 0;
let slopeMultiplier = 4;


let canvas, buffer;
let lp, tp;

function h03(t) {
  let res = (1 - t) * (1 - t) * (1 + 2 * t);
  return res;
}

function h13(t) {
  let res = t * (1 - t) * (1 - t);
  return res;
}

function h23(t) {
  let res = -t * t * (1 - t);
  return res;
}

function h33(t) {
  let res = (3 - 2 * t) * t * t;
  return res;
}

function getPoint(ain, m1in, m2in, bin, t) {
  let an = p5.Vector.mult(ain, h03(t));
  let m1n = p5.Vector.mult(m1in, h13(t));
  let m2n = p5.Vector.mult(m2in, h23(t));
  let bn = p5.Vector.mult(bin, h33(t));

  an.add(m1n);
  an.add(m2n);
  an.add(bn);

  return an;
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("CanvasContainer");
  buffer = createGraphics(600, 600);
  ellipseMode(RADIUS);

  a = createVector(200, 300);
  pm1 = createVector(200, 200);
  b = createVector(400, 300);
  pm2 = createVector(400, 400);

  buffer.background(240);
  buffer.strokeWeight(2);
  lp = a;
}

function draw() {
  background(240);

  image(buffer, 0, 0);

  drawPoint(a, color(0));
  drawPoint(b, color(0));
  drawArrow(a, pm1, color(255,0,0));
  drawArrow(b, pm2, color(255,0,0));

  let m1 = p5.Vector.sub(pm1, a);
  m1.mult(slopeMultiplier);
  let m2 = p5.Vector.sub(pm2, b);
  m2.mult(slopeMultiplier);

  let n = maxTime;
  let hn = n / 2;
  let f = gameFrameCount % n;

  if (f < hn) {
    let t = f / hn;
    let p = getPoint(a, m1, m2, b, t);
    noStroke();
    ellipse(p.x, p.y, 2, 2);

    tp = p;
    buffer.line(lp.x, lp.y, tp.x, tp.y);
    lp = tp;
  } else {
    let t = (f - hn) / hn;
    let p = getPoint(b, m2, m1, a, t);
    noStroke();
    ellipse(p.x, p.y, 2, 2);

    tp = p;
    buffer.line(lp.x, lp.y, tp.x, tp.y);
    lp = tp;
  }

  if (mouseIsPressed) {
    processMousePress();
  }

  gameFrameCount++;
}

function drawPoint(p, myColor) {
  noStroke();
  fill(myColor);
  ellipse(p.x, p.y, 5, 5);
}

function drawArrow(base, end, myColor) {
  let vec = p5.Vector.sub(end, base);
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function processMousePress() {
  if (mouseX > 5 && mouseX < width - 5 && mouseY > 5 && mouseY < height - 5) {
    mouseLoc = createVector(mouseX, mouseY);
    if (p5.Vector.dist(mouseLoc, a) < 20) {
      a = mouseLoc.copy();
      gameFrameCount = 0;
      buffer.background(240);
      gameFrameCount = 0;
    } else {
      if (p5.Vector.dist(mouseLoc, b) < 20) {
        b = mouseLoc.copy();
        gameFrameCount = 0;
        buffer.background(240);
        gameFrameCount = 0;
      }
      else {
        if (p5.Vector.dist(mouseLoc, pm1) < 20) {
          pm1 = mouseLoc.copy();
          gameFrameCount = 0;
          buffer.background(240);
          gameFrameCount = 0;
        }
        else {
          if (p5.Vector.dist(mouseLoc, pm2) < 20) {
            pm2 = mouseLoc.copy();
            gameFrameCount = 0;
            buffer.background(240);
            gameFrameCount = 0;
          }
        }
      }
    }
  }
}
