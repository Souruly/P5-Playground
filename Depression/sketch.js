let playerSpriteSheet;
let groundSpriteSheet;

let groundCenter;
let groundTop;
let playerCloudImage;
let backgroundCloudImage;

let animation = [];
let groundLevel;
let player;
let playerCloud;
let clouds = [];
let cloudSizes;
let playerDirection = 0;

function preload() {
  playerSpriteSheet = loadImage('Assets/player.png');
  groundSpriteSheet = loadImage('Assets/ground.png');
  backgroundCloudImage = loadImage('Assets/cloud.png');
  playerCloudImage = loadImage('Assets/cloud2.png');
}

function setup()
{
  createCanvas(900,500);
  rectMode(CORNERS);
  noStroke(0);

  groundCenter = groundSpriteSheet.get(514, 0, 256, 256);
  groundTop = groundSpriteSheet.get(514, 397, 256, 140);

  groundLevel = height*2/3;

  for (let i = 0; i < 8 ; i++)
  {
    for(let j=0 ; j<8 ; j++)
    {
      let posY = i*64;
      let posX = j*64;
      let img = playerSpriteSheet.get(posX, posY, 64, 64);
      animation.push(img);
    }
  }
  let img = playerSpriteSheet.get(0, 64*8, 64, 64);
  animation.push(img);

  player = new Player(0,0,animation,0.18);
  playerCloud = new Cloud(playerCloudImage,-180,-200,1.55,1.3,0);

  for(let i=0 ; i<4 ; i++)
  {
    let c = new Cloud(backgroundCloudImage,random(10,width+ 100),random(20,40),random(0.7,1.2),random(0.7,1.2),random(0.2,0.7));
    clouds.push(c);
  }
  console.log(clouds);
}

function draw()
{
  background(240);
  fill(255,255,0,51);
  rect(0,0,width,groundLevel);
  if (keyIsDown(RIGHT_ARROW))
  {
    player.moveRight();
    playerDirection = 1;
  }
  else
  {
    if (keyIsDown(LEFT_ARROW))
    {
      player.moveLeft();
      playerDirection = -1;
    }
    else
    {
      player.standStill();
      playerDirection = 0;
    }
  }
  noFill();
  stroke(0);
  strokeWeight(3);
  // line(0,groundLevel,width,groundLevel);
  noStroke();
  drawClouds();
  push();
  translate(width/2,(groundLevel)-48);
  fill(0,128);
  // ellipse(0,0,50,50);
  shearX(PI / 10.0);
  rect(-120,-120,130,50);
  shearX(-PI / 10.0);
  playerCloud.show()
  player.show();
  pop();
  drawGround();
}

function drawGround()
{
  let countX = width/64;
  let countY = height/192;
  for(let j=0 ; j<countY ; j++)
  {
    for(let i=0 ; i<countX ; i++)
    {
      image(groundCenter,i*64,(groundLevel)+35+j*64,64,64);
      if(j==0)
      {
        image(groundTop,i*64,(groundLevel)+j*64,64,35);
      }
    }
  }
}

function drawClouds()
{
  for(let i=0 ; i<clouds.length ; i++)
  {
    clouds[i].show();
    clouds[i].move(-playerDirection);
  }
}
