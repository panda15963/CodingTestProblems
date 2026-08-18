class Solution {
    public int maxProduct(int[] nums) {
        int n = nums.length;

        int maxEndingHere = nums[0];
        int minEndingHere = nums[0];
        int maxProduct = nums[0];

        for (int i = 1; i < n; i++) {
            // 현재 숫자가 음수라면 최대값과 최소값을 교환
            if (nums[i] < 0) {
                int temp = maxEndingHere;
                maxEndingHere = minEndingHere;
                minEndingHere = temp;
            }

            // 현재 위치에서 만들 수 있는 최대/최소 곱
            maxEndingHere = Math.max(
                nums[i],
                maxEndingHere * nums[i]
            );

            minEndingHere = Math.min(
                nums[i],
                minEndingHere * nums[i]
            );

            // 전체 최대값 갱신
            maxProduct = Math.max(maxProduct, maxEndingHere);
        }

        return maxProduct;
    }
}