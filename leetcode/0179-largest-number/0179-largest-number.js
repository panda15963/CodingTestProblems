/**
 * Given a list of non-negative integers, arrange them to form the largest number.
 * @param {number[]} nums
 * @returns {string}
 */
function largestNumber(nums) {
    // a+b와 b+a를 비교해서 더 큰 조합이 앞에 오도록 정렬
    nums.sort((a, b) => {
        const combinationAB = String(a) + String(b);
        const combinationBA = String(b) + String(a);

        return Number(combinationBA) - Number(combinationAB);
    });

    // 모든 숫자가 0인 경우 "000..." 대신 "0" 반환
    if (nums[0] === 0) {
        return '0';
    }

    // 정렬된 숫자를 하나의 문자열로 결합
    return nums.join('');
}