function Projectile(x,y,u)
{
   this.pos = createVector(x,y);
   this.u = u.copy();
   this.acc = createVector(0,0.08);

   this.show = function()
   {
      ellipse(this.pos.x,this.pos.y,25,25);
   }

   this.update = function()
   {
      this.u.add(this.acc);
      this.pos.add(this.u);
      if(this.pos.y>worldOriginY)
      {
         this.pos.y = worldOriginY;
         this.u.setMag(0);
         this.acc.setMag(0);
      }
   }
}
