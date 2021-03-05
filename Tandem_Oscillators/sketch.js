let center;
let radius = 250;
let o1, o2;
let o1Angle = 0, o2Angle = 90;
let o1Phase = 0, o2Phase = 0;
let o1Speed = 1, o2Speed = 2;
let pen;
let drawingBoard;
let o1AngleSlider, o2AngleSlider;
let o1PhaseSlider, o2PhaseSlider;
let o1SpeedSlider, o2SpeedSlider;
let startButton;
let startDrawing = false;
let lastPoint, currentPoint;
let toggleOscillatorsDisplay;
let oscsHidden = false;
let spinner;
let spinnerSpeed = 1 ; spinnerRadius = 40, spinnerPhase = 0;
let spinnerRadiusSlider;
let spinnerSpeedSlider;

function setup() {
  angleMode(DEGREES);
  ellipseMode(CENTER);
  createCanvas(1200, 600);
  createDrawingBoard();

  center = createVector(300, 300);

  o1 = new Oscillator(300, 300, 250, o1Angle, o1Phase, o1Speed);
  o2 = new Oscillator(300, 300, 250, o2Angle, o2Phase, o2Speed);
  spinner = new Spinner(spinnerRadius, 0, spinnerSpeed);

  createDomObjects();
}

function createDrawingBoard() {
  drawingBoard = createGraphics(600, 600);
  drawingBoard.background(255, 0);
  drawingBoard.stroke(0);
  drawingBoard.strokeWeight(5);
}

function createDomObjects() {
  o1AngleSlider = createSlider(0, 360, o1Angle, 1);
  o1AngleSlider.position(700, 100);
  o1AngleSlider.changed(sliderChange);
  o1PhaseSlider = createSlider(0, 360, o1Phase, 1);
  o1PhaseSlider.position(700, 200);
  o1PhaseSlider.changed(sliderChange);
  o1SpeedSlider = createSlider(0, 2, o1Speed, 0.1);
  o1SpeedSlider.position(700, 300);
  o1SpeedSlider.changed(sliderChange);

  o2AngleSlider = createSlider(0, 360, o2Angle, 1);
  o2AngleSlider.position(950, 100);
  o2AngleSlider.changed(sliderChange);
  o2PhaseSlider = createSlider(0, 360, o2Phase, 1);
  o2PhaseSlider.position(950, 200);
  o2PhaseSlider.changed(sliderChange);
  o2SpeedSlider = createSlider(0, 2, o2Speed, 0.1);
  o2SpeedSlider.position(950, 300);
  o2SpeedSlider.changed(sliderChange);

  spinnerRadiusSlider = createSlider(0, 40, spinnerRadius, 1);
  spinnerRadiusSlider.position(700, 400);
  spinnerRadiusSlider.changed(sliderChange);

  spinnerSpeedSlider = createSlider(0, 2, spinnerSpeed, 0.1);
  spinnerSpeedSlider.position(950, 400);
  spinnerSpeedSlider.changed(sliderChange);

  startButton = createButton("Start Drawing");
  startButton.mousePressed(startDraw);
  startButton.position(850, 450);

  toggleOscillatorsDisplay = createButton("Show/Hide Guides");
  toggleOscillatorsDisplay.mousePressed(toggleHideOscs);
  toggleOscillatorsDisplay.position(850, 500);
  // toggleOscillatorsDisplay.hide();
}

function toggleHideOscs() {
  oscsHidden = !oscsHidden;
}

function testClick()
{
  console.log("Click");
}

function startDraw() {
  startDrawing = true;
  o1AngleSlider.hide();
  o1PhaseSlider.hide();
  o1SpeedSlider.hide();
  
  o2AngleSlider.hide();
  o2PhaseSlider.hide();
  o2SpeedSlider.hide();
  
  spinnerRadiusSlider.hide();
  spinnerSpeedSlider.hide();

  startButton.hide();
  console.log("Hi2");

  // toggleOscillatorsDisplay.show();

  // o1.speed *= 2;
  // o2.speed *= 2;
}

function draw() {
  background(240);
  if (!oscsHidden) {
    stroke(0);
    strokeWeight(0.1);
    point(center.x, center.y);
    noFill();
    ellipse(center.x, center.y, radius * 2, radius * 2);
  }

  if (!oscsHidden) {
    o1.show();
    o2.show();
  }

  if (startDrawing) {
    o1.update();
    o2.update();
    spinner.update();
  }

  pen = createVector(o1.position.x, o2.position.y);
  pen = spinner.addPosition(pen);

  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();
  ellipse(pen.x, pen.y, 20, 20);

  if (!oscsHidden) {
    drawAxes();
    drawProjections();
  }

  image(drawingBoard, 0, 0);
  if (startDrawing) {
    if (lastPoint == null) {
      lastPoint = pen;
      currentPoint = pen;
    }
    else {
      lastPoint = currentPoint;
      currentPoint = pen;
      drawingBoard.line(lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y);
    }
  }

  drawText();

}

function drawText() {
  noStroke();
  fill(0);
  textSize(20);
  text("O1 Angle : " + o1Angle, 700, 100);
  text("O1 Phase : " + o1Phase, 700, 200);
  text("O1 Speed : " + o1Speed, 700, 300);

  text("O2 Angle : " + o2Angle, 950, 100);
  text("O2 Phase : " + o2Phase, 950, 200);
  text("O2 Speed : " + o2Speed, 950, 300);

  text("Spinner Radius : " + spinnerRadius, 700, 400);
  text("Spinner Speed : " + spinnerSpeed, 900, 400);

}

function drawAxes() {
  stroke(0);
  strokeWeight(0.1);
  line(0, 300, 600, 300);
  line(300, 0, 300, 600);

  strokeWeight(2);
  rect(2, 2, 598, 598);
}

function drawProjections() {
  stroke(0);
  strokeWeight(0.1);
  line(o1.center.x + o1.marker.x, o1.center.y + o1.marker.y, o1.position.x, o1.position.y);
  line(o2.center.x + o2.marker.x, o2.center.y + o2.marker.y, o2.position.x, o2.position.y);

  line(o1.position.x, o1.position.y, o1.position.x, o2.position.y);
  line(o2.position.x, o2.position.y, o1.position.x, o2.position.y);
  line(o1.position.x, o2.position.y, pen.x, pen.y);

  fill(0);
  ellipse(o1.position.x, o2.position.y, 10, 10);
  noFill();
}

function sliderChange() {
  o1Angle = o1AngleSlider.value();
  o1Phase = o1PhaseSlider.value();
  o1Speed = o1SpeedSlider.value();

  o2Angle = o2AngleSlider.value();
  o2Phase = o2PhaseSlider.value();
  o2Speed = o2SpeedSlider.value();

  spinnerRadius = spinnerRadiusSlider.value();
  spinnerSpeed = spinnerSpeedSlider.value();
  spinner = new Spinner(spinnerRadius, 0, spinnerSpeed);

  o1 = new Oscillator(300, 300, 250, o1Angle, o1Phase, o1Speed);
  o2 = new Oscillator(300, 300, 250, o2Angle, o2Phase, o2Speed);
}
