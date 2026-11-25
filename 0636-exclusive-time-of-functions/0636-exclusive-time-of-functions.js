
var exclusiveTime = function(n, logs) {
    // Initialize result array
    const result = Array(n).fill(0);

    // Track the previous timestamp
    let previousTimestamp = 0;

    // Stack to track executing functions
    const functionStack = [];

    // Process each log entry
    for (const logEntry of logs) {
        // Parse log entry
        const logParts = logEntry.split(':');
        const functionId = logParts[0];
        const operation = logParts[1];
        const currentTimestamp = Number(logParts[2]);

        // Start operation
        if (operation === 'start') {
            // Add elapsed time to the function currently executing
            if (functionStack.length > 0) {
                const topFunctionId = functionStack[functionStack.length - 1];
                result[topFunctionId] += currentTimestamp - previousTimestamp;
            }

            // Push current function onto stack
            functionStack.push(Number(functionId));

            // Update previous timestamp
            previousTimestamp = currentTimestamp;
        } else {
            // End operation
            const poppedFunctionId = functionStack.pop();

            result[poppedFunctionId] += currentTimestamp - previousTimestamp + 1;

            // Move to the next timestamp
            previousTimestamp = currentTimestamp + 1;
        }
    }

    return result;
};
