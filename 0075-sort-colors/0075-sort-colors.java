class Solution {
    public void sortColors(int[] nums) {
        int red = 0;
        int white = 0;
        int blue = 0;

        for (int num : nums) {
            switch (num) {
                case 0:
                    red++;
                    break;
                case 1:
                    white++;
                    break;
                case 2:
                    blue++;
                    break;
            }
        }

        for (int i = 0; i < red; i++) {
            nums[i] = 0;
        }

        for (int i = red; i < red + white; i++) {
            nums[i] = 1;
        }

        for (int i = red + white; i < red + white + blue; i++) {
            nums[i] = 2;
        }
    }
}