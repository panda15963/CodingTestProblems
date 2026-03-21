class Solution {
    public String[] solution(String my_str, int n) {
        int len = my_str.length();
        int size = (len + n - 1) / n;  // 올림(= 필요한 배열 길이)
        String[] answer = new String[size];

        for (int i = 0; i < len; i += n) {
            int end = Math.min(i + n, len);
            answer[i / n] = my_str.substring(i, end);
        }

        return answer;
    }
}