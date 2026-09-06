class Solution {
    public int[] singleNumber(int[] nums) {
        // Step 1: XOR all numbers to get the XOR of the two unique numbers
        // Since duplicate numbers cancel out (a ^ a = 0), we get uniqueNum1 ^ uniqueNum2
        int xorOfTwoUniques = 0;
        for (int num : nums) {
            xorOfTwoUniques ^= num;
        }
      
        // Step 2: Find the rightmost set bit in the XOR result
        // This bit must differ between the two unique numbers
        // Using x & -x isolates the rightmost set bit
        int differentiatingBit = xorOfTwoUniques & -xorOfTwoUniques;
      
        // Step 3: Partition numbers into two groups based on the differentiating bit
        // Group 1: Numbers with this bit set
        // Group 2: Numbers with this bit unset
        // Each group will contain one unique number and pairs of duplicates
        int firstUniqueNum = 0;
        for (int num : nums) {
            // XOR all numbers that have the differentiating bit set
            // Duplicates cancel out, leaving only one unique number
            if ((num & differentiatingBit) != 0) {
                firstUniqueNum ^= num;
            }
        }
      
        // Step 4: Calculate the second unique number
        // Since xorOfTwoUniques = firstUniqueNum ^ secondUniqueNum
        // We can get secondUniqueNum = xorOfTwoUniques ^ firstUniqueNum
        int secondUniqueNum = xorOfTwoUniques ^ firstUniqueNum;
      
        return new int[] {firstUniqueNum, secondUniqueNum};
    }
}
