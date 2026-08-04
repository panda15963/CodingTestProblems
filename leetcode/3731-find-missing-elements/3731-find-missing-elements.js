/**
 * Finds all missing integers between the minimum and maximum values in the array.
 *
 * @param {number[]} nums
 * @return {number[]}
 */
function findMissingElements(nums) {
    let mn = 100;
    let mx = 0;

    const s = new Set();

    for (const x of nums) {
        mn = Math.min(mn, x);
        mx = Math.max(mx, x);
        s.add(x);
    }

    const ans = [];

    for (let x = mn + 1; x < mx; x++) {
        if (!s.has(x)) {
            ans.push(x);
        }
    }

    return ans;
}