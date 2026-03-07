class Solution {
    public int solution(int[] num_list) {  // int[]로 변경
        int oddSum = 0;   // 홀수 번째(1, 3, 5...) 합
        int evenSum = 0;  // 짝수 번째(2, 4, 6...) 합
        
        for (int i = 0; i < num_list.length; i++) {  // .size() → .length
            if (i % 2 == 0) {
                oddSum += num_list[i];  // .get(i) → []
            } else {
                evenSum += num_list[i];
            }
        }
        
        return Math.max(oddSum, evenSum);
    }
}
