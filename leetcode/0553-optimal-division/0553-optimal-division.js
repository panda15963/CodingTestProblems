/**
 * Finds the optimal way to add parentheses in a division expression to maximize the result
 * @param {number[]} nums - Array of positive integers to be divided in sequence
 * @returns {string} String representation of the division expression
 */
function optimalDivision(nums) {
    const arrayLength = nums.length;

    const divisionExpression = nums.join('/');

    if (arrayLength > 2) {
        const firstDivisionIndex = divisionExpression.indexOf('/') + 1;

        return `${divisionExpression.slice(0, firstDivisionIndex)}(${divisionExpression.slice(firstDivisionIndex)})`;
    }

    return divisionExpression;
}