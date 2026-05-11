/**
 * Separates each number in the array into its individual digits
 * @param {number[]} nums - Array of positive integers to separate
 * @returns {number[]} Array containing all digits from all numbers in order
 */
function separateDigits(nums) {
    const result = [];

    for (const currentNumber of nums) {
        const digits = [];
        let remainingNumber = currentNumber;

        while (remainingNumber > 0) {
            digits.push(remainingNumber % 10);
            remainingNumber = Math.floor(remainingNumber / 10);
        }

        result.push(...digits.reverse());
    }

    return result;
}