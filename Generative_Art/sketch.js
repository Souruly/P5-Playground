let drawButton;
let resetButton;
let link;
let drawing = false;
let numberOfSegments = 3;
let segments = [];
let angles = [];
let points = [];
let buffer;
let px,py,tx,ty;
let hu = 0;

function setup(){
  numberOfSegments = round(random(1,6));
  createCanvas(1200,600);
  ellipseMode(RADIUS);
  textAlign(CENTER,TOP);
  rectMode(CORNERS);
  angleMode(DEGREES);
  background(240);

  // hu = round(random(0,360));
  hu = 255;
  drawButton = createButton("DRAW!");
  drawButton.position(870,230);
  drawButton.mousePressed(changeView);
  resetButton = createButton("Refresh");
  resetButton.position(870,330);
  resetButton.mousePressed(resetSketch);
  let l = floor(280/numberOfSegments);
  let seg0 = new Segment(300,300,l,0,0);
  seg0.getInitialEndPoint();
  segments.push(seg0);
  for(let i=1 ; i<numberOfSegments ; i++)
  {
    let parent = segments[i-1];
    let seg = new Segment(parent.endPoint.x,parent.endPoint.y,l,0,i);
    seg.getInitialEndPoint();
    segments.push(seg);
  }

  for(let i=0 ; i<numberOfSegments ; i++)
  {
    let a = round(random(-6,6));
    if(i==0)
    {
      let da;
      do{
        da = round(random(-5,5));
      }
      while(da==0);
      da = da/100;
      a += da;
    }
    angles.push(a);
  }

  buffer = createGraphics(600, 600);
  buffer.background(240);

  link = createA('https://github.com/Souruly/souruly.github.io/blob/master/README.md','GITHUB REPO','_blank');
  link.position(850,490);
}

function draw(){
  background(240);
  imageMode(CORNER);
  image(buffer, 0, 0, 600, 600);
  // colorMode(RGB);
  // fill(192,128);
  // rect(1,1,599,599);

  fill(0);
  noStroke();
  textSize(40);
  textStyle(BOLD);
  text("GENERATIVE ART",900,0);
  textStyle(NORMAL);
  textSize(18);
  //text("A LOW RES. SIMULATION FOR STATIC CHARGE STRUCTURE",900,42);
  text("Number of segment(s) : " + numberOfSegments,900,100);
  text("Rotation(s) : " + angles,900,150);
  text("Press this button to start drawing.",900,200);
  text("Refresh the page to get new drawings each time.",900,300);
  stroke(0);
  //line(900,0,900,600);
  strokeWeight(5);
  line(600,70,1200,70);
  strokeWeight(3);
  line(600,450,1200,450);

  for(let i=0 ; i<numberOfSegments ; i++)
  {
    segments[i].show();
  }

  let l = segments.length;
  tx = segments[l-1].endPoint.x;
  ty = segments[l-1].endPoint.y;

  if(drawing)
  {
    buffer.stroke(0);
    // colorMode(HSB);
    // let c = color(hu, 0, 0);
    // console.log(c);
    // buffer.stroke(c);
    buffer.strokeWeight(2);
    if (frameCount > 1) {
      buffer.line(px, py, tx, ty);
    }
    // hu+=0.1;
    // if(hu>360)
    // {
    //   hu=0;
    // }
  }

  for(let i=0 ; i<numberOfSegments ; i++)
  {
    segments[i].update(angles[i],segments);
  }
  drawBorders();
  px = tx;
  py = ty;
}

function changeView()
{
  if(drawing==false)
  {
    drawing = true;
  }
}

function resetSketch()
{
  window.location.reload();
}

function drawBorders()
{
  stroke(0);
  strokeWeight(5);
  line(1,1,600-1,1);
  line(600-1,1,600-1,height-1);
  line(600-1,height-1,1,height-1);
  line(1,height-1,1,1);
}
