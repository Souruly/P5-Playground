function Spark(row,col,i)
{
  this.r = row;
  this.c = col;
  this.index = row*cols + col;

  this.show = function()
  {
    //let col = color(r,0,b);
    fill(255-i*7);
    let y = this.r*scl;
    let x = this.c*scl;
    rect(x,y,x+scl,y+scl);
  }

  this.getLocation = function()
  {
    return this.index;
  }
}
