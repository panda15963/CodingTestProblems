class Solution {
    public int lengthLongestPath(String input) {
        int currentIndex = 0;
        int inputLength = input.length();
        int maxPathLength = 0;
      
        // Stack stores cumulative lengths at each directory level
        Deque<Integer> directoryLengthStack = new ArrayDeque<>();
      
        while (currentIndex < inputLength) {
            // Count the indentation level (number of tabs)
            int indentationLevel = 0;
            while (currentIndex < inputLength && input.charAt(currentIndex) == '\t') {
                indentationLevel++;
                currentIndex++;
            }
          
            // Calculate current file/directory name length and check if it's a file
            int currentNameLength = 0;
            boolean isFile = false;
            while (currentIndex < inputLength && input.charAt(currentIndex) != '\n') {
                currentNameLength++;
                if (input.charAt(currentIndex) == '.') {
                    isFile = true;
                }
                currentIndex++;
            }
          
            // Skip the newline character
            currentIndex++;
          
            // Pop directories from stack that are at same or deeper level
            // This happens when we move to a sibling or parent directory
            while (!directoryLengthStack.isEmpty() && directoryLengthStack.size() > indentationLevel) {
                directoryLengthStack.pop();
            }
          
            // Calculate cumulative path length including parent directories
            int cumulativePathLength = currentNameLength;
            if (!directoryLengthStack.isEmpty()) {
                // Add parent's cumulative length plus 1 for the '/' separator
                cumulativePathLength += directoryLengthStack.peek() + 1;
            }
          
            // If it's a directory, push its cumulative length to stack for future use
            if (!isFile) {
                directoryLengthStack.push(cumulativePathLength);
            } else {
                // If it's a file, update the maximum path length
                maxPathLength = Math.max(maxPathLength, cumulativePathLength);
            }
        }
      
        return maxPathLength;
    }
}
