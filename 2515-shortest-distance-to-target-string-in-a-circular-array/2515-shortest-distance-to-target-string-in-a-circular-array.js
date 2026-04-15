/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
var closestTarget = function(words, target, startIndex) {
    const n = words.length;
    let minDist = n;
    
    for (let i = 0; i < n; i++) {
        if (words[i] === target) {
            const direct = Math.abs(i - startIndex);
            const wrap = n - direct;
            minDist = Math.min(minDist, Math.min(direct, wrap));
        }
    }
    
    return minDist === n ? -1 : minDist;
};