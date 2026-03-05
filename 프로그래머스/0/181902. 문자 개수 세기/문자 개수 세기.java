class Solution {
    public int[] solution(String my_string) {
        int[] answer = new int[52];
        for (char ch : my_string.toCharArray()) {
            if (ch >= 'A' && ch <= 'Z') {
                answer[ch - 'A']++;
            } else {
                answer[26 + ch - 'a']++;
            }
        }
        return answer;
    }
}
