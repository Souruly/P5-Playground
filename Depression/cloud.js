class Cloud
{
  constructor(cloudImage,x,y,xScale,yScale, speed)
  {
    this.cloudImage = cloudImage;
    this.x = x;
    this.y = y;
    this.xScale = xScale;
    this.yScale = yScale;
    this.speed = speed;
  }

  show()
  {
    image(this.cloudImage,this.x,this.y,192*this.xScale,108*this.yScale);
  }

  move(direction)
  {
    this.x += direction*this.speed;
    if(this.x<-200 || this.x>(width+150))
    {
      if(this.x>(width+150))
      {
        this.resetCloud(-1);
      }
      else
      {
        this.resetCloud(1);
      }
    }
  }

  resetCloud(mul)
  {
    let dist = width/2;
    let offset = 100;
    this.x = random(dist + dist*mul , dist + (dist + 100)*mul);
    this.y = random(20,40);
    this.xScale = random(0.7,1.2);
    this.yScale = random(0.7,1.2);
    this.speed = random(0.2,0.7);
  }
}
