class Solution {
    public int smallestIndex(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            int currentNumber = nums[i];
            int digitSum = 0;

            while (currentNumber > 0) {
                digitSum += currentNumber % 10;
                currentNumber /= 10;
            }

            if (digitSum == i) {
                return i;
            }
        }

        return -1;
    }
}