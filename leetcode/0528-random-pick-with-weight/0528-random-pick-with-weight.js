var Solution = function(weights) {
    this.cumulativeSum = new Array(weights.length + 1).fill(0);

    for (let i = 0; i < weights.length; i++) {
        this.cumulativeSum[i + 1] =
            this.cumulativeSum[i] + weights[i];
    }
};

Solution.prototype.pickIndex = function() {
    const total = this.cumulativeSum[this.cumulativeSum.length - 1];

    const randomTarget = 1 + Math.floor(Math.random() * total);

    let left = 1;
    let right = this.cumulativeSum.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (this.cumulativeSum[mid] >= randomTarget) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left - 1;
};