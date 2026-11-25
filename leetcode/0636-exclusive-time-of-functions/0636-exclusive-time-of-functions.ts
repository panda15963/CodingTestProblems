/**
 * Calculate the exclusive execution time for each function based on logs
 * @param n - Number of functions
 * @param logs - Array of log strings in format "function_id:start_or_end:timestamp"
 * @returns Array where index i contains the exclusive execution time of function i
 */
function exclusiveTime(n: number, logs: string[]): number[] {
    // Initialize result array to store exclusive time for each function
    const result: number[] = Array(n).fill(0);
  
    // Track the previous timestamp for calculating time intervals
    let previousTimestamp: number = 0;
  
    // Stack to track currently executing functions (stores function IDs)
    const functionStack: number[] = [];
  
    // Process each log entry
    for (const logEntry of logs) {
        // Parse log entry: [functionId, operation, timestamp]
        const logParts: string[] = logEntry.split(':');
        const functionId: string = logParts[0];
        const operation: string = logParts[1];
        const currentTimestamp: string = logParts[2];
      
        // Check if this is a start operation
        if (operation[0] === 's') {
            // If stack is not empty, add elapsed time to the function at top of stack
            if (functionStack.length > 0) {
                const topFunctionId: number = functionStack[functionStack.length - 1];
                result[topFunctionId] += Number(currentTimestamp) - previousTimestamp;
            }
          
            // Push current function to stack
            functionStack.push(Number(functionId));
          
            // Update previous timestamp
            previousTimestamp = Number(currentTimestamp);
        } else {
            // End operation: pop function from stack and add its execution time
            const poppedFunctionId: number = functionStack.pop()!;
            result[poppedFunctionId] += Number(currentTimestamp) - previousTimestamp + 1;
          
            // Update previous timestamp to next unit after end
            previousTimestamp = Number(currentTimestamp) + 1;
        }
    }
  
    return result;
}
