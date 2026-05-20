function findThePrefixCommonArray(A: number[], B: number[]): number[] {
    const n: number = A.length;
    const result: number[] = new Array(n).fill(0);
    const frequency: number[] = new Array(n + 1).fill(0);
    let commonCount: number = 0;

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
}