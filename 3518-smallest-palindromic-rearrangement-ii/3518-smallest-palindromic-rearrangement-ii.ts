/**
 * @param s
 * @param k
 * @returns
 */
function smallestPalindrome(s: string, k: number): string {
    const MAX: number = 1_000_001;

    const count: Map<string, number> = new Map();

    for (const c of s) {
        count.set(c, (count.get(c) ?? 0) + 1);
    }

    if (!isPalindromePossible(count)) {
        return "";
    }

    const { halfCount, midLetter } = getHalfCountAndMidLetter(count);

    const totalPerm: number = calculateTotalPermutations(halfCount);
    if (k > totalPerm) {
        return "";
    }

    const leftHalf: string[] = generateLeftHalf(halfCount, k);

    return (
        leftHalf.join("") +
        midLetter +
        [...leftHalf].reverse().join("")
    );

    function isPalindromePossible(count: Map<string, number>): boolean {
        let oddCount: number = 0;

        for (const freq of count.values()) {
            if (freq % 2 === 1) {
                oddCount++;
            }
        }

        return oddCount <= 1;
    }

    function getHalfCountAndMidLetter(
        count: Map<string, number>
    ): { halfCount: number[]; midLetter: string } {
        const halfCount: number[] = Array(26).fill(0);
        let midLetter: string = "";

        for (const [c, freq] of count.entries()) {
            halfCount[c.charCodeAt(0) - 97] = Math.floor(freq / 2);

            if (freq % 2 === 1) {
                midLetter = c;
            }
        }

        return { halfCount, midLetter };
    }

    function calculateTotalPermutations(halfCount: number[]): number {
        return countArrangements(halfCount);
    }

    function generateLeftHalf(
        halfCount: number[],
        k: number
    ): string[] {
        const halfLen: number = halfCount.reduce((a, b) => a + b, 0);
        const left: string[] = [];

        for (let pos = 0; pos < halfLen; pos++) {
            for (let i = 0; i < 26; i++) {
                if (halfCount[i] === 0) {
                    continue;
                }

                halfCount[i]--;

                const arrangements: number = countArrangements(halfCount);

                if (arrangements >= k) {
                    left.push(String.fromCharCode(97 + i));
                    break;
                } else {
                    k -= arrangements;
                    halfCount[i]++;
                }
            }
        }

        return left;
    }

    function countArrangements(count: number[]): number {
        let total: number = count.reduce((a, b) => a + b, 0);
        let res: number = 1;

        for (const freq of count) {
            res *= nCk(total, freq);

            if (res >= MAX) {
                return MAX;
            }

            total -= freq;
        }

        return res;
    }

    function nCk(n: number, k: number): number {
        let res: number = 1;

        for (let i = 1; i <= Math.min(k, n - k); i++) {
            res = Math.floor((res * (n - i + 1)) / i);

            if (res >= MAX) {
                return MAX;
            }
        }

        return res;
    }
}