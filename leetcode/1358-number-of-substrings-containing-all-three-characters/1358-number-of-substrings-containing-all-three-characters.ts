function numberOfSubstrings(s: string): number {
    // Array to store the last seen position of each character 'a', 'b', 'c'
    // Initialize with -1 to indicate characters haven't been seen yet
    const lastPosition: number[] = [-1, -1, -1];
    let result: number = 0;
  
    // Iterate through each character in the string
    for (let i = 0; i < s.length; i++) {
        // Update the last seen position for the current character
        // charCodeAt(0) - 97 converts 'a' to 0, 'b' to 1, 'c' to 2
        // (97 is the ASCII code for 'a')
        lastPosition[s.charCodeAt(i) - 97] = i;
      
        // Find the minimum position among all three characters
        // This represents the leftmost position where we have all three characters
        const minPosition: number = Math.min(lastPosition[0], Math.min(lastPosition[1], lastPosition[2]));
      
        // Add the number of valid substrings ending at position i
        // minPosition + 1 gives the count of starting positions that form valid substrings
        // If minPosition is -1 (not all characters seen yet), this adds 0
        result += minPosition + 1;
    }
  
    return result;
}