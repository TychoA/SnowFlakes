/**
 *  A class representing a single snowflake
 * 
 *  @author  Tycho Atsma  <tycho.atsma@gmail.com>
 *  @file    SnowFlake.js
 */
class SnowFlake {

    /**
     *  The constructor
     * 
     *  @param  int  the x coordinate
     *  @param  int  the y coordinate
     *  @param  int  the radius
     *  @param  int  the max x coordinate
     *  @param  int  the max y coordinate
     *  @param  Vector  the gravity
     */
    constructor (x, y, radius, maxX, maxY) {

        // assign the given parameters
        this.pos = createVector(x, y);

        // the velocity
        this.velocity = createVector(0, 5);

        // the acceleration
        this.acceleration = createVector(0, 0);

        // a random angle
        this.angle = random(TWO_PI);
        this.direction = (Math.random() > .5) ? 1 : -1;

        // the x offset
        this.offset = 0;

        // the radius
        this.radius = radius;

        // the max boundaries
        this.maxX = maxX;
        this.maxY = maxY;
    }

    /**
     *  Draw a single snowflake
     */
    draw () {

        // make it white
        fill(255);

        // no stroke
        strokeWeight(this.radius);

        // create a new ellipse
        point(this.pos.x + this.offset, this.pos.y);
    }

    /**
     *  Apply some force to the flake
     * 
     *  @param  Vector  the force
     */
    applyForce (force) {
        
        // copy the force
        let f = force.copy();

        // divide it by mass
        f.mult(this.radius);
        
        // add it to the acceleration
        this.acceleration.add(f);
    }

    /**
     *  Move a single snowflake
     */
    move () {

        // update the speed
        this.velocity.add(this.acceleration);

        // limit the velocity
        this.velocity.limit(this.radius * .1);

        // calculate the offset
        this.offset = sin(this.angle * 2) * 2 * (this.radius);

        // increment the velocity
        this.pos.add(this.velocity);

        // multiply
        this.acceleration.mult(0);

        // update the angle
        this.angle += this.direction * this.velocity.mag() / 200;
    };

    /**
     *  Is a flake on screen?
     * 
     *  @return  boolean
     */
    isVisible () {

        // are we out of boundaries
        if (this.pos.x < 0 || this.pos.x > this.maxX || this.pos.y < -this.radius || this.pos.y > (this.maxY + this.radius)) return false;
        else return true;
    }
    
    /**
     *  Reset the flake's position
     */
    reset () {

        // are we too much to the left?
        if (this.pos.x < 0) this.pos.x = this.maxX;

        // too much to the right?
        if (this.pos.x > this.maxX) this.pos.x = this.radius;

        // too much up or down?
        if (this.pos.y < 0 || this.pos.y > (this.maxY + this.radius)) this.pos.y = -this.radius;

        // reset the velocity
        this.velocity = createVector(0, 5);
    }
};