function nthSuperUglyNumber(n: number, primes: number[]): number {
    const k = primes.length;

    const ugly: number[] = new Array(n);
    ugly[0] = 1;

    const indices: number[] = new Array(k).fill(0);
    const values: number[] = [...primes];

    for (let i = 1; i < n; i++) {
        let next = Infinity;

        for (let j = 0; j < k; j++) {
            next = Math.min(next, values[j]);
        }

        ugly[i] = next;

        for (let j = 0; j < k; j++) {
            if (values[j] === next) {
                indices[j]++;
                values[j] = ugly[indices[j]] * primes[j];
            }
        }
    }

    return ugly[n - 1];
}