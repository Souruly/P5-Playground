let maxPoints = 6;
let maxTime = 200;
let canvas,drawingBuffer;
let myPoints = [];
let lp, tp;
let selectedPoint = -1;
let numPointsSlider;
let gameFrameCount=0;

function resetSketch()
{
    generateRandomPoints();
    drawingBuffer.background(240);

    lp = myPoints[0];
    gameFrameCount = 0;
}

function generateRandomPoints() {
  myPoints = [];
  for (let i = 0; i < maxPoints; i++) {
    let x = round(random(0, width));
    let y = round(random(0, height));
    let p = createVector(x, y);
    myPoints.push(p);
  }
}

function getBezierPoint(controlPoints, t) {
  let numPoints = controlPoints.length;
  let bezPoint;
  if (numPoints <= 2) {
    bezPoint = getLinearInterpolation(controlPoints[0], controlPoints[1], t);
  } else {
    newPoints = [];
    for (let i = 0; i < numPoints - 1; i++) {
      let p1 = controlPoints[i];
      let p2 = controlPoints[i + 1];
      let linInterPoint = getLinearInterpolation(p1, p2, t);
      newPoints.push(linInterPoint);
    }
    bezPoint = getBezierPoint(newPoints, t);
  }
  return bezPoint;
}

function getLinearInterpolation(p1, p2, t) {
  let x = p1.x * (1 - t) + p2.x * t;
  let y = p1.y * (1 - t) + p2.y * t;
  let linInterPoint = createVector(x, y);
  return linInterPoint;
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("CanvasContainer");
  drawingBuffer = createGraphics(600, 600);
  ellipseMode(RADIUS);

  numPointsSlider = createSlider(2,6,3);
  numPointsSlider.parent("SketchControls");
  numPointsSlider.changed(processNumPointsSLider)
  
  processNumPointsSLider();

  drawingBuffer.stroke(0, 0, 0);
  drawingBuffer.strokeWeight(2);
}

function draw() {
  background(240);
  image(drawingBuffer, 0, 0);

  let f = gameFrameCount % maxTime;
  let t = f / maxTime;

  drawPoint(myPoints[0], color(0, 255, 0));
  drawPoint(myPoints[maxPoints - 1], color(255, 0, 0));
  for (let i = 1; i < maxPoints - 1; i++) {
    drawPoint(myPoints[i], color(128));
  }

  drawPolyLine(myPoints);

  p = getBezierPoint(myPoints, t);
  drawPoint(p, color(0, 0, 255));

  if (t < 0.995) {
    drawingBuffer.line(lp.x, lp.y, p.x, p.y);
    lp = p;
  } else {
    lp = myPoints[0];
    drawingBuffer.background(240);
  }

  if (mouseIsPressed) {
    processMousePress();
  }

  gameFrameCount += 1;
}

function drawPoint(point, col) {
  noStroke();
  fill(col);
  ellipse(point.x, point.y, 5, 5);
}

function drawPolyLine(points) {
  stroke(0);
  strokeWeight(1);
  for (let i = 0; i < points.length - 1; i++) {
    let p1 = points[i];
    let p2 = points[i + 1];
    line(p1.x, p1.y, p2.x, p2.y);
  }
}

function processMousePress() {
  if (mouseX > 5 && mouseX < width - 5 && mouseY > 5 && mouseY < height - 5) {
    mouseLoc = createVector(mouseX, mouseY);

    for (let i = 0; i < maxPoints; i++) {
      if (p5.Vector.dist(mouseLoc, myPoints[i]) < 10) {
        selectedPoint = i;
        break;
      }
    }

    if (selectedPoint >= 0) {
      myPoints[selectedPoint] = mouseLoc.copy();
      if(selectedPoint==0)
      {
        gameFrameCount = 0;
        drawingBuffer.background(240);
      }
    }
  }
}

function processNumPointsSLider()
{
    maxPoints = numPointsSlider.value();
    let dispStr = "Number of Points: "+ maxPoints.toString();
    document.getElementById("numPoints").innerHTML = dispStr;

    resetSketch();
}
