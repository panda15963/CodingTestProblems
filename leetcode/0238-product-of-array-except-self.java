import java.util.*;

class Solution {
    public int[] productExceptSelf(int[] nums) {
        // 결과 배열
        int[] answer = new int[nums.length];
        Arrays.fill(answer, 1);

        // 앞쪽과 뒤쪽 누적 곱
        int prefixProduct = 1;
        int suffixProduct = 1;

        // 앞쪽 누적 곱 계산
        for (int i = 0; i < nums.length - 1; i++) {
            prefixProduct *= nums[i];
            answer[i + 1] = prefixProduct;
        }

        // 뒤쪽 누적 곱 계산
        for (int i = nums.length - 1, index = 0;
             i > 0;
             i--, index++) {

            suffixProduct *= nums[i];
            answer[i - 1] *= suffixProduct;
        }

        return answer;
    }
}