/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
function smallestPalindrome(s, k) {
    const MAX = 1000001;

    const count = new Map();
    for (const c of s) {
        count.set(c, (count.get(c) || 0) + 1);
    }

    if (!isPalindromePossible(count)) {
        return "";
    }

    const { halfCount, midLetter } = getHalfCountAndMidLetter(count);

    const totalPerm = calculateTotalPermutations(halfCount);
    if (k > totalPerm) {
        return "";
    }

    const leftHalf = generateLeftHalf(halfCount, k);

    return (
        leftHalf.join("") +
        midLetter +
        [...leftHalf].reverse().join("")
    );

    function isPalindromePossible(count) {
        let oddCount = 0;

        for (const freq of count.values()) {
            if (freq % 2 === 1) {
                oddCount++;
            }
        }

        return oddCount <= 1;
    }

    function getHalfCountAndMidLetter(count) {
        const halfCount = Array(26).fill(0);
        let midLetter = "";

        for (const [c, freq] of count.entries()) {
            halfCount[c.charCodeAt(0) - 97] = Math.floor(freq / 2);

            if (freq % 2 === 1) {
                midLetter = c;
            }
        }

        return { halfCount, midLetter };
    }

    function calculateTotalPermutations(halfCount) {
        return countArrangements(halfCount);
    }

    function generateLeftHalf(halfCount, k) {
        const halfLen = halfCount.reduce((a, b) => a + b, 0);
        const left = [];

        for (let pos = 0; pos < halfLen; pos++) {
            for (let i = 0; i < 26; i++) {
                if (halfCount[i] === 0) {
                    continue;
                }

                halfCount[i]--;

                const arrangements = countArrangements(halfCount);

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

    function countArrangements(count) {
        let total = count.reduce((a, b) => a + b, 0);
        let res = 1;

        for (const freq of count) {
            res *= nCk(total, freq);

            if (res >= MAX) {
                return MAX;
            }

            total -= freq;
        }

        return res;
    }

    function nCk(n, k) {
        let res = 1;

        for (let i = 1; i <= Math.min(k, n - k); i++) {
            res = Math.floor((res * (n - i + 1)) / i);

            if (res >= MAX) {
                return MAX;
            }
        }

        return res;
    }
}