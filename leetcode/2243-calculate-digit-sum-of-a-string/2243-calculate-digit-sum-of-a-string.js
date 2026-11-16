/**
 * Performs k-length digit sum transformation on a string
 * until its length is at most k.
 *
 * @param {string} s - The input string containing digits
 * @param {number} k - The group size for digit sum transformation
 * @returns {string} The final transformed string
 */
function digitSum(s, k) {
    // 문자열 길이가 k보다 큰 동안 반복
    while (s.length > k) {
        // 각 그룹의 자릿수 합을 저장할 배열
        const groupSums = [];

        // 문자열을 k개씩 나누어 처리
        for (let startIndex = 0; startIndex < s.length; startIndex += k) {
            // k개의 문자 추출
            const group = s.slice(startIndex, startIndex + k);

            // 현재 그룹의 숫자 합 계산
            const sum = group
                .split('')
                .reduce((accumulator, digit) => accumulator + Number(digit), 0);

            // 계산한 합 저장
            groupSums.push(sum);
        }

        // 배열의 합들을 문자열로 변환
        s = groupSums.join('');
    }

    return s;
}