class Spinner
{
    constructor(r, phase, speed)
    {
        this.position = createVector(0,0);
        this.marker = createVector(0, r);
        this.speed = speed;
    }

    addPosition(pen)
    {
        this.position = p5.Vector.add(pen, this.marker);
        return this.position;
    }

    update()
    {
        this.marker.rotate(1*this.speed);
    }
}