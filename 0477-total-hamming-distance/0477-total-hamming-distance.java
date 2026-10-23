class Solution {
    public int totalHammingDistance(int[] nums) {
        int totalDistance = 0;
        int arrayLength = nums.length;
      
        // Iterate through each bit position (0 to 31 for 32-bit integers)
        for (int bitPosition = 0; bitPosition < 32; bitPosition++) {
            int onesCount = 0;
          
            // Count how many numbers have a 1 at the current bit position
            for (int number : nums) {
                // Right shift by bitPosition and check if the least significant bit is 1
                onesCount += (number >> bitPosition) & 1;
            }
          
            // Calculate the number of 0s at this bit position
            int zerosCount = arrayLength - onesCount;
          
            // For this bit position, the Hamming distance contribution is:
            // (number of 1s) * (number of 0s)
            // This counts all pairs where one number has 1 and the other has 0
            totalDistance += onesCount * zerosCount;
        }
      
        return totalDistance;
    }
}
