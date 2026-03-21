class Solution {
    public int solution(int[] array) {
        int answer = 0;

        for (int num : array) {
            String s = String.valueOf(num);
            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) == '7') {
                    answer++;
                }
            }
        }

        return answer;
    }
}