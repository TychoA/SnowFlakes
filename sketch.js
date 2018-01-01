/**
 *  A sketch for displaying snowflakes based on the 
 *  coding challenge of Daniel Shiffman.
 *  
 *  @url  http://www.youtube.com
 * 
 *  @author  Tycho Atsma  <tycho.atsma@gmail.com>
 *  @file    SnowFlake.js
 */

/**
 *  An array of snowflakes
 * 
 *  @var  array
 */
let flakes = [];

/**
 *  The world's gravity
 * 
 *  @var  Vector
 */
let gravity;

/**
 *  Calculate a random size that
 *  favors smaller numbers
 *  
 *  @return  int
 */
function randomSize () {
    
    // get a random gaussian distribution
    let r = randomGaussian() * 2;

    // return the absolute value
    return abs(r * r);
};

/**
 *  Setup
 */
function setup() {

    // create a new canvas
    createCanvas(windowWidth, windowHeight);

    // set the gravity
    gravity = createVector(0, .01);

    // create some new flakes
    for (let n = 0; n < 200; ++n) {
        
        // a random x
        let x = Math.random() * width;

        // a random y
        let y = Math.random() * height;

        // a random size
        let radius = randomSize();

        // push to the array of flakes
        flakes.push(new SnowFlake(x, y, radius, width, height, gravity));
    }
}

// the z offset for the wind
let zOff = 0;

/**
 *  Draw
 */
function draw() {

    // set the background
    background(0);

    // increment the offset
    zOff += .2;

    // loop over the flakes
    for (let flake of flakes)
    {
        // the x offset
        let xOff = flake.pos.x / width;
        let yOff = flake.pos.y / height;

        // set some random wind
        let wind = p5.Vector.fromAngle(noise(xOff, yOff, zOff) * TWO_PI);

        // make it a bit smaller
        wind.mult(0.01);

        // apply some force
        flake.applyForce(gravity);
        flake.applyForce(wind);

        // draw the flake
        flake.draw();

        // move the flake
        flake.move();

        // is it still visible
        if (!flake.isVisible()) flake.reset();
    }
}