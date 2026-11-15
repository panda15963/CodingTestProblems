
/**
 * Find the longest harmonious subsequence in an array
 * A harmonious subsequence is one where the difference between max and min elements is exactly 1
 * @param {number[]} nums - The input array of numbers
 * @returns {number} The length of the longest harmonious subsequence
 */
function findLHS(nums) {
    // 각 숫자의 등장 횟수를 저장하는 객체
    const frequencyMap = {};

    // 숫자별 빈도수 계산
    for (const num of nums) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }

    // 가장 긴 조화로운 부분 수열의 길이
    let maxLength = 0;

    // 각 숫자와 해당 숫자의 빈도수 순회
    for (const [numStr, frequency] of Object.entries(frequencyMap)) {
        // 문자열 키를 숫자로 변환
        const currentNum = Number(numStr);
        const nextNum = currentNum + 1;

        // 다음 연속된 숫자가 존재하는지 확인
        if (frequencyMap[nextNum]) {
            // 두 숫자의 빈도수 합으로 최댓값 갱신
            maxLength = Math.max(
                maxLength,
                frequency + frequencyMap[nextNum]
            );
        }
    }

    return maxLength;
}
