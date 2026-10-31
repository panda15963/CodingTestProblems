/**
 * @param {number} num
 * @return {boolean}
 */
var checkPerfectNumber = function(num) {
    // Perfect numbers must be greater than 1
    if (num <= 1) {
        return false;
    }

    // Initialize sum with 1
    let divisorSum = 1;

    // Check divisors up to sqrt(num)
    for (let divisor = 2; divisor * divisor <= num; divisor++) {
        if (num % divisor === 0) {
            divisorSum += divisor;

            // Add the corresponding divisor pair
            if (divisor * divisor !== num) {
                divisorSum += num / divisor;
            }
        }
    }

    return divisorSum === num;
};