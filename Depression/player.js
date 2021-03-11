class Player
{
  constructor(x,y,animation,speed)
  {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.speed = speed;
    this.index = 0;
    this.len = 8;
    this.isStanding = true;
    this.isLeft = false;
  }

  show()
  {
    let index;
    if(this.isStanding == true)
    {
      index = 64;
    }
    else
    {
      let tempInd = floor(this.index) % this.len;
      index = 32 + tempInd;
    }
    if(this.isLeft)
    {
      scale(-1 , 1);
      image(this.animation[index], this.x-32, this.y-16);
    }
    else
    {
      scale(1 , 1)
      image(this.animation[index], this.x-32, this.y-16);
    }
  }

  moveRight()
  {
    this.index += this.speed;
    this.isStanding = false;
    this.isLeft = false;
  }

  moveLeft()
  {
    this.index += this.speed;
    this.isStanding = false;
    this.isLeft = true;
  }

  standStill()
  {
    this.isStanding = true;
  }
}
