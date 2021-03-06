let numberOfBirds;
let birds = [];
let numberOfCaptures = 0;
let captureButton;
let releaseButton;
let gamePaused = false;
let msg = "";
let Fn,FK,Fk;

let previousMarked;

function setup()
{
   createCanvas(1200,600);
   textAlign(CENTER,CENTER);

   numberOfBirds = round(random(25,55));
   for(let i=0 ; i<numberOfBirds ; i++)
   {
     let b = new Bird(round(random(0,600)), round(random(0,600)));
     birds.push(b);
   }

   captureButton = createButton('Capture and Mark');
   captureButton.position(900,300);
   captureButton.mousePressed(captureAndMark);
   releaseButton = createButton('Release');
   releaseButton.position(900,300);
   releaseButton.mousePressed(release);
   releaseButton.hide();

   previousMarked = 0;
}

function captureAndMark()
{
  captureButton.hide();
  releaseButton.show();
  gamePaused = true;
  numberOfCaptures++;

  let captured = 0;
  let newMarked = 0;
  for(let i=0 ; i<birds.length ; i++)
  {
    if(birds[i].position.x<500 && birds[i].position.y<500 && birds[i].position.x>100 && birds[i].position.y>100)
    {
      captured++;
      if(birds[i].marked==true)
      {
        previousMarked++;
      }
      else
      {
        birds[i].marked = true;
        newMarked++;
      }
    }
  }

  console.log("Captured : " + captured);
  console.log(" New Markings : " + newMarked);
  console.log("Old Markings : " + previousMarked);

  if(numberOfCaptures==1)
  {
    Fn = captured;
  }
  if(numberOfCaptures==2)
  {
    FK = captured;
    Fk = previousMarked;
  }
}

function release()
{
  releaseButton.hide();
  captureButton.show();
  gamePaused = false;
  console.log(Fn,FK,Fk);
  if(numberOfCaptures==2)
  {
    let p = (FK+1) * (Fn+1) / (Fk+1);
    msg = "Estimated Population Size : " + floor(p.toString()) +
    "\nActual population Size : " + numberOfBirds.toString();
    captureButton.hide();
  }
}

function draw()
{
  background(240);
  drawStructure();
  for(let i=0 ; i<birds.length ; i++)
  {
    birds[i].show();
    if(!gamePaused)
    {
      birds[i].update(birds);
    }
  }
}

function drawStructure()
{
  fill(51);
  rect(0,0,600,600);
  stroke(0);
  strokeWeight(2);
  line(1,1,1199,1);
  line(599,1,599,599);
  line(1199,599,1,599);
  line(1,599,1,1);
  line(1199,1,1199,599);
  line(600,100,1200,100);

  noFill();
  stroke(255);
  rect(100,100,400,400);
  fill(0);
  noStroke();
  textSize(48);
  text("Capture Recapture",900,50);
  textSize(20);
  text(msg,800,300);
  noFill();
}
