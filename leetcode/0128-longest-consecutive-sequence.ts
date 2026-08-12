function longestConsecutive(nums: number[]): number {
    // Create a set from the input array for O(1) lookup
    const numSet = new Set(nums);

    // Track the maximum length of consecutive sequence found
    let maxLength = 0;

    // Map to store the length of consecutive sequences starting from each number
    const sequenceLengthMap = new Map<number, number>();

    // Iterate through each number in the array
    for (const num of nums) {
        // Start from the current number and find consecutive sequence
        let currentNum = num;

        // Keep incrementing while consecutive numbers exist in the set
        while (numSet.has(currentNum)) {
            // Remove processed number from set to avoid reprocessing
            numSet.delete(currentNum);
            currentNum++;
        }

        // Calculate and store the length of sequence starting from 'num'
        // If a sequence already exists starting from 'currentNum', add its length
        const existingLength = sequenceLengthMap.get(currentNum) || 0;
        const totalLength = existingLength + (currentNum - num);
        sequenceLengthMap.set(num, totalLength);

        // Update the maximum length found so far
        maxLength = Math.max(maxLength, sequenceLengthMap.get(num)!);
    }

    return maxLength;
}