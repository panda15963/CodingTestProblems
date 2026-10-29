var Solution = function(m, n) {
    this.rows = m;
    this.cols = n;
    this.remainingCells = m * n;
    this.swapMap = new Map();
};

Solution.prototype.flip = function() {
    const randomIndex = Math.floor(
        Math.random() * this.remainingCells
    );

    this.remainingCells--;

    const actualIndex =
        this.swapMap.get(randomIndex) ?? randomIndex;

    this.swapMap.set(
        randomIndex,
        this.swapMap.get(this.remainingCells) ?? this.remainingCells
    );

    const row = Math.floor(actualIndex / this.cols);
    const col = actualIndex % this.cols;

    return [row, col];
};

Solution.prototype.reset = function() {
    this.remainingCells = this.rows * this.cols;
    this.swapMap.clear();
};