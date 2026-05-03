/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function(s, goal) {
    // 1. If lengths are different, s can never become goal
    if (s.length !== goal.length) return false;

    // 2. Check if goal is a substring of (s + s)
    return (s + s).includes(goal);
};