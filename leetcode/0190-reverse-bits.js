/**
 * Reverses the bits of a 32-bit unsigned integer.
 *
 * @param {number} n
 * @return {number}
 */
function reverseBits(n) {
    let result = 0;

    // 32개의 비트를 처리
    for (let i = 0; i < 32 && n > 0; i++) {
        // 가장 오른쪽 비트를 가져와서 반대 위치로 이동
        result |= (n & 1) << (31 - i);

        // 다음 비트 처리
        n >>= 1;
    }

    // 부호 없는 32비트 정수로 변환
    return result >>> 0;
}