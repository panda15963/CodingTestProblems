class Solution {
    public int[] exclusiveTime(int n, List<String> logs) {
        // Array to store the exclusive execution time for each function
        int[] result = new int[n];
      
        // Stack to keep track of currently executing functions
        Deque<Integer> functionStack = new ArrayDeque<>();
      
        // Previous timestamp to calculate time intervals
        int previousTime = 0;
      
        // Process each log entry
        for (String logEntry : logs) {
            // Parse the log entry: "functionId:start/end:timestamp"
            String[] logParts = logEntry.split(":");
            int functionId = Integer.parseInt(logParts[0]);
            String action = logParts[1];
            int currentTime = Integer.parseInt(logParts[2]);
          
            if (action.charAt(0) == 's') {  // "start" action
                // If there's a function currently running, update its time
                if (!functionStack.isEmpty()) {
                    int runningFunctionId = functionStack.peek();
                    result[runningFunctionId] += currentTime - previousTime;
                }
              
                // Push the new function onto the stack
                functionStack.push(functionId);
                previousTime = currentTime;
              
            } else {  // "end" action
                // Pop the ending function and update its exclusive time
                // Add 1 because end timestamp is inclusive
                int endingFunctionId = functionStack.pop();
                result[endingFunctionId] += currentTime - previousTime + 1;
              
                // Update previous time to the next unit after the end
                previousTime = currentTime + 1;
            }
        }
      
        return result;
    }
}
