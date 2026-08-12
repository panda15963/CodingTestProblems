class Solution {
    public int longestConsecutive(int[] nums) {
        // Create a set containing all numbers for O(1) lookup
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }

        int maxLength = 0;
        // Map to store the length of consecutive sequence starting from each number
        Map<Integer, Integer> sequenceLengthMap = new HashMap<>();

        for (int num : nums) {
            // Start from current number and find the end of consecutive sequence
            int currentNum = num;

            // Keep incrementing while consecutive numbers exist in the set
            while (numSet.contains(currentNum)) {
                numSet.remove(currentNum);
                currentNum++;
            }

            // currentNum is now the first number NOT in the sequence
            // Calculate and store the length of sequence starting from num
            // If currentNum already has a cached result, add it to avoid recalculation
            int sequenceLength = (currentNum - num) + sequenceLengthMap.getOrDefault(currentNum, 0);
            sequenceLengthMap.put(num, sequenceLength);

            // Update the maximum length found so far
            maxLength = Math.max(maxLength, sequenceLengthMap.get(num));
        }

        return maxLength;
    }
}
