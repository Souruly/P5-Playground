function Person(pId, x, y, infectedStatus) {
    this.personId = pId
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.d = 8;
    this.infected = infectedStatus;
    this.cured = false;
    this.immunity = round(random(400, 700));
    this.life = totalSimTime;

    this.update = function () {
        this.position.add(this.velocity);
        this.checkBounds();
        if (this.life > 0) {
            this.checkCollision();
            if (this.infected) {
                if (this.life == totalSimTime) {
                    this.life = this.immunity;
                }
                else {
                    this.life--;
                }
            }
        }
        this.velocity.limit(random(2, 3));

        if (simTime > vaccineFoundTime) {
            if (random(0, 1) < cureRate) {
                if (this.infected) {
                    this.infected = false;
                    this.cured = true;
                }
            }
        }
    }

    this.checkCollision = function () {
        for (let i = 0; i < numberOfPeople; i++) {
            if (this.personId != people[i].personId && people[i].life > 0) {
                let distance = p5.Vector.dist(this.position, people[i].position);
                if (distance < this.d) {

                    //collide
                    let temp = people[i].velocity.x;
                    people[i].velocity.x = this.velocity.x;
                    this.velocity.x = temp;

                    temp = people[i].velocity.y;
                    people[i].velocity.y = this.velocity.y;
                    this.velocity.y = temp;

                    //repel
                    let thisFinalMag = this.velocity.mag();
                    let thatFinalMag = people[i].velocity.mag();
                    let dir = p5.Vector.sub(people[i].position, this.position)
                    dir.setMag(0.9);
                    this.velocity.add(-dir);
                    people[i].velocity.add(dir);
                    this.velocity.setMag(thisFinalMag);
                    people[i].velocity.setMag(thatFinalMag);

                    if (this.infected == true || people[i].infected == true) {
                        if (reinfectionPossible) {
                            this.infected = true;
                            people[i].infected = true;
                            this.cured = false;
                            people[i].cured = false;
                        }
                        else {
                            if (!this.cured) {
                                this.infected = true;
                            }
                            if (!people[i].cured) {
                                people[i].infected = true;
                            }
                        }
                    }
                }
            }
        }
    }

    this.checkBounds = function () {
        let accel = 0.5;
        if (this.position.x < 5) {
            this.position.x = 5;
            this.velocity.x = -this.velocity.x + accel;
        }

        if (this.position.y < 5) {
            this.position.y = 5;
            this.velocity.y = -this.velocity.y + accel;
        }

        if (this.position.x > 595) {
            this.position.x = 595;
            this.velocity.x = -this.velocity.x - accel;
        }

        if (this.position.y > 595) {
            this.position.y = 595;
            this.velocity.y = -this.velocity.y - accel;
        }
    }

    this.getColor = function () {
        if (this.infected) {
            return color(255, 0, 127);
        }
        else {
            if (this.cured) {
                return color(51, 153, 255);
            }
            return color(133, 219, 37);
        }

    }

    this.show = function () {
        noStroke();
        let c = this.getColor();
        fill(c);
        if (this.life == 0) {
            noFill();
            stroke(51);
            strokeWeight(0.5);
        }
        ellipse(this.position.x, this.position.y, this.d);
    }
}