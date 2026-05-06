/**
 * @param {character[][]} box
 * @return {character[][]}
 */
var rotateTheBox = function(box) {
    const m = box.length;
    const n = box[0].length;

    // 1. Apply gravity to each row (moving stones to the right)
    for (let r = 0; r < m; r++) {
        let lowestAvailable = n - 1;
        for (let c = n - 1; c >= 0; c--) {
            if (box[r][c] === '#') {
                // Move stone to the lowest available spot
                [box[r][c], box[r][lowestAvailable]] = [box[r][lowestAvailable], box[r][c]];
                lowestAvailable--;
            } else if (box[r][c] === '*') {
                // Obstacle blocks further stones; reset available spot
                lowestAvailable = c - 1;
            }
        }
    }

    // 2. Rotate the box 90 degrees clockwise
    const res = Array.from({ length: n }, () => Array(m).fill('.'));
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            res[c][m - 1 - r] = box[r][c];
        }
    }

    return res;
};
