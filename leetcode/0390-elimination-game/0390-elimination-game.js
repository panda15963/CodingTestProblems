var lastRemaining = function(n) {
    let firstElement = 1;
    let lastElement = n;

    let stepSize = 1;
    let iteration = 0;
    let remainingCount = n;

    while (remainingCount > 1) {
        if (iteration % 2 === 0) {
            // Left to right
            firstElement += stepSize;

            if (remainingCount % 2 === 1) {
                lastElement -= stepSize;
            }
        } else {
            // Right to left
            lastElement -= stepSize;

            if (remainingCount % 2 === 1) {
                firstElement += stepSize;
            }
        }

        remainingCount = Math.floor(remainingCount / 2);
        stepSize *= 2;
        iteration++;
    }

    return firstElement;
};