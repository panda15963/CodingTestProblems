function arrayNesting(nums: number[]): number {
    const arraySize: number = nums.length;
    const visited: boolean[] = new Array(arraySize).fill(false);
    let maxCycleLength: number = 0;
  
    // Iterate through each element as a potential starting point
    for (let startIndex = 0; startIndex < arraySize; startIndex++) {
        // Skip if this element is already part of a previously found cycle
        if (visited[startIndex]) {
            continue;
        }
      
        // Start exploring the cycle from current index
        let currentIndex: number = nums[startIndex];
        let currentCycleLength: number = 1;
        visited[currentIndex] = true;
      
        // Follow the chain until we return to the starting element
        // The cycle ends when nums[currentIndex] equals nums[startIndex]
        while (nums[currentIndex] !== nums[startIndex]) {
            currentIndex = nums[currentIndex];  // Jump to next index in the cycle
            currentCycleLength++;
            visited[currentIndex] = true;
        }
      
        // Update the maximum cycle length found so far
        maxCycleLength = Math.max(maxCycleLength, currentCycleLength);
    }
  
    return maxCycleLength;
}
