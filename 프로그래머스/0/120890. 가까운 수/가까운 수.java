class Solution {
    public int solution(int[] array, int n) {
        int answer = array[0];
        int minDiff = Math.abs(n - answer);
        
        for (int num : array) {
            int diff = Math.abs(n - num);
            if (diff < minDiff || (diff == minDiff && num < answer)) {
                minDiff = diff;
                answer = num;
            }
        }
        return answer;
    }
}
