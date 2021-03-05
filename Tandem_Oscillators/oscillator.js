class Oscillator
{
    constructor(cx, cy, max, n, phase, speed)
    {
        this.center = createVector(cx, cy);
        this.max = max;
        this.n = n;
        this.position = createVector(0,0);
        this.speed = speed;

        this.marker = createVector(this.max, 0);
        this.marker.rotate(phase)
        
        this.position.x = this.getX();
        this.position.y = this.getY();
    }

    getX()
    {
        let x = (this.marker.x + this.marker.y*tan(this.n))/(1+(tan(this.n))*(tan(this.n)));
        x += this.center.x;
        return x;
    }

    getY()
    {
        let y = ((this.marker.x + this.marker.y*tan(this.n))*tan(this.n))/(1+(tan(this.n))*(tan(this.n)));
        y += this.center.y;
        return y;
    }

    show()
    {
        stroke(255,0,0);
        strokeWeight(1);
        noFill();
        ellipse(this.position.x, this.position.y, 10, 10);
        fill(0,0,255);
        stroke(0);
        ellipse(this.center.x + this.marker.x, this.center.y + this.marker.y, 5, 5);
        noFill();
        line(this.center.x-this.max*cos(this.n),this.center.y-this.max*sin(this.n),this.center.x+this.max*cos(this.n),this.center.y+this.max*sin(this.n))
        // line(axis.x-max,axis.y-max,axis.x,axis.y)
    }

    update()
    {
        this.marker.rotate(1*this.speed);
        this.position.x = this.getX();
        this.position.y = this.getY();
    }
}