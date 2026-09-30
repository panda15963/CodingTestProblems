function lengthLongestPath(input: string): number {
    let index = 0;
    const inputLength = input.length;
    let maxPathLength = 0;
    const pathLengthStack: number[] = [];  // Stack to store cumulative path lengths at each directory level
  
    while (index < inputLength) {
        // Count the indentation level (number of tabs)
        let indentLevel = 0;
        while (index < inputLength && input[index] === '\t') {
            indentLevel++;
            index++;
        }
      
        // Calculate the length of current file/directory name
        let currentNameLength = 0;
        let isFile = false;
        while (index < inputLength && input[index] !== '\n') {
            currentNameLength++;
            // Check if current entry is a file (contains a dot)
            if (input[index] === '.') {
                isFile = true;
            }
            index++;
        }
      
        // Skip the newline character
        index++;
      
        // Pop directories from stack that are deeper than current indent level
        // This happens when we move back up in the directory tree
        while (pathLengthStack.length > 0 && pathLengthStack.length > indentLevel) {
            pathLengthStack.pop();
        }
      
        // Calculate cumulative path length including parent directories
        let cumulativePathLength = currentNameLength;
        if (pathLengthStack.length > 0) {
            // Add parent path length plus 1 for the separator '/'
            cumulativePathLength += pathLengthStack[pathLengthStack.length - 1] + 1;
        }
      
        // If it's a directory, push its cumulative length to stack for future use
        if (!isFile) {
            pathLengthStack.push(cumulativePathLength);
            continue;
        }
      
        // If it's a file, update the maximum path length
        maxPathLength = Math.max(maxPathLength, cumulativePathLength);
    }
  
    return maxPathLength;
}
