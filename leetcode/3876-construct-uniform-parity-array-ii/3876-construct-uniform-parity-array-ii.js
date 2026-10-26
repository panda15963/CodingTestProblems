/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function(nums1) {
    let mn = Number.MAX_SAFE_INTEGER;

    // 홀수 중 가장 작은 값 찾기
    for (const x of nums1) {
        if (x % 2 === 1) {
            mn = Math.min(mn, x);
        }
    }

    // 가장 작은 홀수보다 작은 짝수가 있는지 확인
    for (const x of nums1) {
        if (
            x % 2 === 0 &&
            mn !== Number.MAX_SAFE_INTEGER &&
            x < mn
        ) {
            return false;
        }
    }

    return true;
};