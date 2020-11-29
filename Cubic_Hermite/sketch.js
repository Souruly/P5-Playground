let a, b;
let m1, m2;

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
  canvas.parent("CanvasContainer")
  buffer = createGraphics(600,600);
  ellipseMode(RADIUS);

  a = createVector(200, 300);
  b = createVector(400, 300);

  m1 = createVector(0, 500);
  m2 = createVector(0, 500);

  buffer.background(240);
  buffer.strokeWeight(2);
  lp = a;
}

function draw() {
  // background(240);

  image(buffer, 0, 0);

  drawPoint(a, m1);
  drawPoint(b, m2);

  let n = 400;
  let hn = n/2
  let f = frameCount % n;

  if (f < hn) {
    let t = f / hn;
    let p = getPoint(a, m1, m2, b, t);
    noStroke();
    ellipse(p.x, p.y, 2, 2);

    tp = p;
    buffer.line(lp.x, lp.y, tp.x, tp.y);
    lp = tp;
  } else {
    let t = (f-hn) / hn;
    let p = getPoint(b, m2, m1, a, t);
    noStroke();
    ellipse(p.x, p.y, 2, 2);

    tp = p;
    buffer.line(lp.x, lp.y, tp.x, tp.y);
    lp = tp;
  }

  m1.rotate(0.01);
}

function drawPoint(p, m) {
  fill(0);
  ellipse(p.x, p.y, 5, 5);

  stroke(255, 0, 0);
  strokeWeight(2);
  push();
  translate(p.x, p.y);
  line(0, 0, m.x / 10, m.y / 10);
  pop();
}
