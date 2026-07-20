/**
 * Multiplies two non-negative integers represented as strings.
 *
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    // Early return for zero multiplication
    if (num1 === "0" || num2 === "0") {
        return "0";
    }

    // Get lengths of input numbers
    const length1 = num1.length;
    const length2 = num2.length;

    // Maximum possible length is length1 + length2
    const resultArray = new Array(length1 + length2).fill(0);

    // Multiply each digit from right to left
    for (let i = length1 - 1; i >= 0; i--) {
        const digit1 = Number(num1[i]);

        for (let j = length2 - 1; j >= 0; j--) {
            const digit2 = Number(num2[j]);

            resultArray[i + j + 1] += digit1 * digit2;
        }
    }

    // Handle carry
    for (let i = resultArray.length - 1; i > 0; i--) {
        resultArray[i - 1] += Math.floor(resultArray[i] / 10);
        resultArray[i] %= 10;
    }

    // Skip leading zeros
    let startIndex = 0;
    while (
        startIndex < resultArray.length &&
        resultArray[startIndex] === 0
    ) {
        startIndex++;
    }

    // Convert to string
    return resultArray.slice(startIndex).join("");
};