function Charge(row,col,v)
{
  this.r = row;
  this.c = col;
  this.index = row*cols + col;
  this.value = v;

  this.show = function()
  {
    let r = map(this.value,-128,128,255,0);
    let b = map(this.value,-128,128,0,255);
    let col = color(r,0,b);
    fill(col);
    let y = this.r*scl;
    let x = this.c*scl;
    rect(x,y,x+scl,y+scl);
  }
}
