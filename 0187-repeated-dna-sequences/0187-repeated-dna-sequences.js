/**
 * @param {string} s
 * @return {string[]}
 */
function findRepeatedDnaSequences(s) {
    const seen = new Set();
    const res = new Set();

    for (let l = 0; l <= s.length - 10; l++) {
        const cur = s.substring(l, l + 10);

        if (seen.has(cur)) {
            res.add(cur);
        }

        seen.add(cur);
    }

    return Array.from(res);
}