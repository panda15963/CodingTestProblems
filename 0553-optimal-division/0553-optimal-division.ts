/**
 * Finds the optimal way to add parentheses in a division expression to maximize the result
 * @param nums - Array of positive integers to be divided in sequence
 * @returns String representation of the division expression with optimal parentheses placement
 */
function optimalDivision(nums: number[]): string {
    // Get the length of the input array
    const arrayLength: number = nums.length;
  
    // Create the initial division expression by joining all numbers with '/'
    const divisionExpression: string = nums.join('/');
  
    // For arrays with more than 2 elements, add parentheses around all divisors
    // This maximizes the result by converting divisions into multiplications
    // Example: a/(b/c/d) = a * (d/(b*c)) which is larger than a/b/c/d
    if (arrayLength > 2) {
        // Find the position after the first division operator
        const firstDivisionIndex: number = divisionExpression.indexOf('/') + 1;
      
        // Add parentheses around everything after the first division
        return `${divisionExpression.slice(0, firstDivisionIndex)}(${divisionExpression.slice(firstDivisionIndex)})`;
    }
  
    // For arrays with 1 or 2 elements, return the expression as-is
    // No parentheses needed since there's only one way to evaluate
    return divisionExpression;
}
