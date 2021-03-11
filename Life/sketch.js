let lifeline = [];
let slider;
let speedFactor = 50;

function setup()
{
  createCanvas(600,600);
  rectMode(CENTER);
  let p = new Point(300,300);
  lifeline.push(p);
  slider = new Slider(10);
}

function draw()
{
  background(240);
  stroke(0);
  strokeWeight(2);

  if (keyIsDown(LEFT_ARROW)) {
    if(slider.position>10)
    {
      slider.position--;
      removePoint();
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if(slider.position<590)
    {
      slider.position++;
      makeNewPoint();
    }
  }

  for(let i=0 ; i<lifeline.length ; i++)
  {
    point(lifeline[i].x,lifeline[i].y);
  }
  slider.show();
}

function makeNewPoint()
{
  for(let i=0 ; i<speedFactor ; i++)
  {
    let lx = lifeline[lifeline.length-1].x;
    let ly = lifeline[lifeline.length-1].y;
    let xoff = round(random(-1.5,1.5));
    let yoff = round(random(-1.5,1.5));
    let p = new Point(lx + xoff , ly + yoff);
    lifeline.push(p);
  }
}

function removePoint()
{
  for(let i=0 ; i<speedFactor ; i++)
  {
    lifeline.pop();
  }
}
