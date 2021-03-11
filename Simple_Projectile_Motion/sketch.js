var csize = 600;
var projectile;
var worldOriginX, worldOriginY;
var u;

function setup()
{
   createCanvas(800,csize);
   frameRate(30);
   worldOriginX = 50;
   worldOriginY = height-50;
   u = createVector(5,-5);
   projectile = new Projectile(worldOriginX,worldOriginY,u);
}

function draw()
{
   background(51);
   //Axes
   stroke(255);
   strokeWeight(2);
   line(0,height-50,width,height-50);
   line(50,0,50,height);
   textSize(10);
   noStroke();
   fill(255);
   for(var i=0 ; i<15 ; i++)
   {
      text(i,worldOriginX+i*50,worldOriginY+10);
      text(i,worldOriginX-10,worldOriginY-2-i*50);
   }

   //Projectile
   projectile.show();
   projectile.update();
}

function getWorldX(realX)
{
   var x = realX - worldOriginX;
   return x;
}

function getWorldY(realY)
{
      var y = worldOriginY-realY;
      return y;
}


function mousePressed()
{
   var x = getWorldX(mouseX);
   var y = getWorldY(mouseY);
   x = floor(x/50);
   y = floor(y/50);
   console.log(x,y);
}
