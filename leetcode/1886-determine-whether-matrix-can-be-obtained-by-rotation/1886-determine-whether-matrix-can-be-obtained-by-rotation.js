function findRotation(mat, target) {
    const n = mat.length;

    const isEqual = (a, b) => {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (a[i][j] !== b[i][j]) return false;
            }
        }
        return true;
    };

    const rotate = (matrix) => {
        const newMat = Array.from({ length: n }, () => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                newMat[j][n - i - 1] = matrix[i][j];
            }
        }

        return newMat;
    };

    for (let i = 0; i < 4; i++) {
        if (isEqual(mat, target)) return true;
        mat = rotate(mat);
    }

    return false;
}