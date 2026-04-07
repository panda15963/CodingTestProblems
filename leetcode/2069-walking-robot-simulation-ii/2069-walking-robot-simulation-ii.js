/**
 * @param {number} width
 * @param {number} height
 */
var Robot = function(width, height) {
    this.cycleLength = 2 * (width + height) - 4;
    this.positions = Array.from({ length: this.cycleLength }, () => [0, 0]);
    this.directions = new Array(this.cycleLength);
    this.index = 0;
    this.moved = false;

    let current = 0;
    this.positions[current] = [0, 0];
    this.directions[current++] = "South";

    for (let x = 1; x < width; x++) {
        this.positions[current] = [x, 0];
        this.directions[current++] = "East";
    }

    for (let y = 1; y < height; y++) {
        this.positions[current] = [width - 1, y];
        this.directions[current++] = "North";
    }

    for (let x = width - 2; x >= 0; x--) {
        this.positions[current] = [x, height - 1];
        this.directions[current++] = "West";
    }

    for (let y = height - 2; y >= 1; y--) {
        this.positions[current] = [0, y];
        this.directions[current++] = "South";
    }
};

/**
 * @param {number} num
 * @return {void}
 */
Robot.prototype.step = function(num) {
    if (num === 0) {
        return;
    }

    this.moved = true;
    this.index = (this.index + num % this.cycleLength) % this.cycleLength;
};

/**
 * @return {number[]}
 */
Robot.prototype.getPos = function() {
    return [...this.positions[this.index]];
};

/**
 * @return {string}
 */
Robot.prototype.getDir = function() {
    return this.moved ? this.directions[this.index] : "East";
};