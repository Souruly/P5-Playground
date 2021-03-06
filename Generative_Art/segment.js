function Segment(x,y,len,theta,i)
{
  this.startPoint = createVector(x,y);
  this.length = len;
  this.angle = theta;
  this.endPoint = createVector(0,0);
  this.index = i;

  this.getInitialEndPoint = function()
  {
    let x = this.startPoint.x + (this.length)*cos(this.angle);
    let y = this.startPoint.y + (this.length)*sin(this.angle);
    this.endPoint.set(x,y);
  }

  this.update = function(dtheta,segments)
  {
    if(this.index==0)
    {
      this.angle += dtheta;
      let x = this.startPoint.x + (this.length)*cos(this.angle);
      let y = this.startPoint.y + (this.length)*sin(this.angle);
      this.endPoint.set(x,y);
    }
    else
    {
      this.startPoint = segments[this.index-1].endPoint.copy();
      this.angle += dtheta;
      let x = this.startPoint.x + (this.length)*cos(this.angle);
      let y = this.startPoint.y + (this.length)*sin(this.angle);
      this.endPoint.set(x,y);
    }
  }

  this.show = function()
  {
    //console.log(this.endPoint);
    if(drawing)
    {
      stroke(192);
    }
    else
    {
      stroke(0);
    }
    strokeWeight(2);
    line(this.startPoint.x,this.startPoint.y,this.endPoint.x,this.endPoint.y);
  }
}
