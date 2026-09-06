/**
 * Finds two unique numbers in an array where all other numbers appear twice.
 *
 * @param {number[]} nums
 * @return {number[]}
 */
function singleNumber(nums) {
    // 모든 숫자를 XOR하여 두 개의 고유한 숫자의 XOR 값을 구함
    const xorOfTwoUniques = nums.reduce(
        (accumulator, current) => accumulator ^ current
    );

    // 가장 오른쪽에 있는 1비트 찾기
    const rightmostSetBit =
        xorOfTwoUniques & -xorOfTwoUniques;

    // 첫 번째 고유한 숫자 찾기
    let firstUniqueNumber = 0;

    for (const num of nums) {
        // 특정 비트가 설정된 숫자끼리 XOR
        if (num & rightmostSetBit) {
            firstUniqueNumber ^= num;
        }
    }

    // 두 번째 고유한 숫자 찾기
    const secondUniqueNumber =
        xorOfTwoUniques ^ firstUniqueNumber;

    return [firstUniqueNumber, secondUniqueNumber];
}