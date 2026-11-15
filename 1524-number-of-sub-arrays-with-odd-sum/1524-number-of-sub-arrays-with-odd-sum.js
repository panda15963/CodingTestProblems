
/**
 * Counts the number of subarrays with odd sum
 * @param {number[]} arr - The input array of numbers
 * @returns {number} The count of subarrays with odd sum, modulo 10^9 + 7
 */
function numOfSubarrays(arr) {
    let result = 0;
    let prefixSum = 0;

    // evenOddCount[0] = 짝수 누적 합의 개수
    // evenOddCount[1] = 홀수 누적 합의 개수
    // 빈 배열의 누적 합은 0(짝수)이므로 [1, 0]으로 초기화
    const evenOddCount = [1, 0];

    const MOD = 1e9 + 7;

    for (const num of arr) {
        // 누적 합 갱신
        prefixSum += num;

        // 현재 누적 합의 홀짝 확인 (0: 짝수, 1: 홀수)
        const currentParity = prefixSum & 1;

        // 반대 홀짝 구하기
        const oppositeParity = currentParity ^ 1;

        // 반대 홀짝을 가진 누적 합의 개수만큼 결과 증가
        result = (result + evenOddCount[oppositeParity]) % MOD;

        // 현재 누적 합의 홀짝 개수 증가
        evenOddCount[currentParity]++;
    }

    return result;
}
