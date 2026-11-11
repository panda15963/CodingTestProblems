/**
 * @param {number} cost1
 * @param {number} cost2
 * @param {number} costBoth
 * @param {number} need1
 * @param {number} need2
 * @return {number}
 */
var minimumCost = function(cost1, cost2, costBoth, need1, need2) {
    const a = need1 * cost1 + need2 * cost2;

    const b = costBoth * Math.max(need1, need2);

    const mn = Math.min(need1, need2);

    const c =
        costBoth * mn +
        (need1 - mn) * cost1 +
        (need2 - mn) * cost2;

    return Math.min(a, b, c);
};