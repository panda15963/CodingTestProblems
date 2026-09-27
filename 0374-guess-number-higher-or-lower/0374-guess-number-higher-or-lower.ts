function guessNumber(n: number): number {
    let left = 1;
    let right = n;

    while (left <= right) {
        const mid: number = Math.floor(
            left + (right - left) / 2
        );

        const result: number = guess(mid);

        if (result === 0) {
            return mid;
        } else if (result === -1) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}