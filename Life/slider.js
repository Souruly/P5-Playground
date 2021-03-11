function Slider(position)
{
  this.position = position;

  this.show = function()
  {
    fill(32);
    noStroke();
    rect(this.position,590,20,20);
  }

  this.update = function(pos)
  {
    this.position = pos;
  }
}
