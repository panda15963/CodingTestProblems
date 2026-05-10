class Solution {
    public long solution(int[] sequence) {
        long answer = 0;
        int n = sequence.length;
        
        // 펄스 패턴 1: 1, -1, 1, -1, ...
        // 펄스 패턴 2: -1, 1, -1, 1, ...
        long[] p1 = new long[n];
        long[] p2 = new long[n];
        
        for (int i = 0; i < n; i++) {
            if (i % 2 == 0) {
                p1[i] = (long) sequence[i] * 1;
                p2[i] = (long) sequence[i] * -1;
            } else {
                p1[i] = (long) sequence[i] * -1;
                p2[i] = (long) sequence[i] * 1;
            }
        }
        
        // 카데인 알고리즘(Kadane's Algorithm) 적용
        answer = Math.max(getMaxSum(p1), getMaxSum(p2));
        
        return answer;
    }
    
    private long getMaxSum(long[] arr) {
        long maxVal = arr[0];
        long currentSum = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            currentSum = Math.max(arr[i], currentSum + arr[i]);
            maxVal = Math.max(maxVal, currentSum);
        }
        
        return maxVal;
    }
}
