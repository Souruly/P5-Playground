let rows = 20,cols = 40;
let wx = 600 / rows;
let wy = 600 / cols;
let drawing;
let textGrid = [];
let displayText = "";
let tBox;
let lastPoint;
let clearButton;
let getTextButton;

function setup()
{
  createCanvas(1200,600);
  textAlign(CENTER,CENTER);
  drawing = createGraphics(600,600);
  drawing.background(240);

  for (let i = 0; i < rows; i++) 
  {
    let row = []
    for (let j = 0; j < cols; j++) 
    {
      row.push(false);
    }
    textGrid.push(row)
  } 
  fill(240);
  rect(0, 0, 600, 600); 
  tBox = select('#tA');
  let minSize = 300;
  let deltaSize = cols*1.5;
  let fSize = minSize+deltaSize
  tBox.position(80,150);
  tBox.size(fSize,fSize);

  clearButton = createButton("Clear Canvas");
  clearButton.mousePressed(clearCanvas)
  clearButton.position(500,400);
  getTextButton = createButton("Get Text");
  getTextButton.mousePressed(getText)
  getTextButton.position(500, 500);

}

function clearCanvas()
{
  location.reload();
}

function getText()
{
  displayText = "```"
  for (let j = 0; j < cols + 2; j++) {
    displayText += "-"
  }
  displayText += "```\n"
  for (let i = 0; i < rows; i++) {
    displayText += "```|"
    for (let j = 0; j < cols; j++) {
      if (textGrid[i][j] == true) {
        displayText += "O"
      }
      else {
        displayText += "·"
      }
    }
    displayText += "|"
    displayText += "```\n";
  }
  displayText += "```"
  for (let j = 0; j < cols + 2; j++) {
    displayText += "-"
  }
  displayText += "```\n"
  console.log(displayText);
}

function updateText()
{
  displayText = ""
  for (let j = 0; j < cols+2; j++) {
    displayText += "-"
  }
  displayText +="\n"
  for (let i = 0; i < rows; i++) {
    displayText += "|"
    for (let j = 0; j < cols; j++) {
      if (textGrid[i][j] == true) 
      {
        displayText += "O"
      }
      else
      {
        displayText += "·"
      }
    }
    displayText += "|"
    displayText += "\n";
  }
  for (let j = 0; j < cols + 2; j++) {
    displayText += "-"
  }
  displayText += "\n"
  tBox.value(displayText);
}

function draw()
{
  image(drawing,600,0);
  drawStructure();
  stroke(0);
  drawing.stroke(0);
  drawing.strokeWeight(15);
  if (mouseIsPressed === true) {
    if (mouseX < 1200 && mouseX > 600 && mouseY < 600 && mouseY > 0) {
      let x1 = mouseX-600;
      let x2 = pmouseX - 600
      drawing.line(x1, mouseY, x2, pmouseY);
      let j1 = round(map(x1, 0, 600, 0, cols-1))
      let i1 = round(map(mouseY, 0, 600, 0, rows-1))
      let j2 = round(map(x2,0,600,0,cols-1))
      let i2 = round(map(pmouseY, 0, 600, 0, rows-1))
      if(lastPoint)
      {
        currentPoint = createVector(i2,j2);
      }
      else
      {
        lastPoint = createVector(i1,j1);
        currentPoint = createVector(i2,j2);
      }
      textGrid[i2][j2] = true;
    }
  }
  updateText();
}

function drawStructure()
{
  fill(240);
  rect(0,0,600,600);
  stroke(0);
  strokeWeight(2);
  line(1,1,1199,1);
  line(599,1,599,599);
  line(1199,599,1,599);
  line(1,599,1,1);
  line(1199,1,1199,599);

  strokeWeight(0.1);
  stroke(24);
  for(let i=0 ; i<cols ; i++)
  {
    line(600+i*wy,0,600+i*wy,600);
  }
  for (let i = 0; i < rows; i++) {
    line(600,i*wx, 1200, i*wx);
  }

  noStroke();
  fill(0);
  textSize(32);
  text("DRAW HERE--->",450,50);
  text("Text :",100,130);
}
