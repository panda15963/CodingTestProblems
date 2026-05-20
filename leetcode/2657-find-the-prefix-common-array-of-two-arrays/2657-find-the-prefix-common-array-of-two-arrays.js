var findThePrefixCommonArray = function (A, B) {
    const n = A.length;
    const result = new Array(n).fill(0);
    const frequency = new Array(n + 1).fill(0);
    let commonCount = 0;

    for (let i = 0; i < n; i++) {
        if (++frequency[A[i]] === 2) {
            commonCount++;
        }
        if (++frequency[B[i]] === 2) {
            commonCount++;
        }
        result[i] = commonCount;
    }

    return result;
};