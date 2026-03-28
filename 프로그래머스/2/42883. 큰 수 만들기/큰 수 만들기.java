class Solution {
    public String solution(String number, int k) {
        int len = number.length();
        int targetLen = len - k;  // 남기는 숫자 길이
        StringBuilder answer = new StringBuilder();
        int start = 0;

        for (int i = 0; i < targetLen; i++) {
            // 남겨야 할 자릿수: targetLen - i - 1
            int remain = targetLen - i - 1;
            int end = len - remain;
            char maxChar = '0';
            int maxIdx = start;

            for (int j = start; j < end; j++) {
                if (number.charAt(j) > maxChar) {
                    maxChar = number.charAt(j);
                    maxIdx = j;
                    if (maxChar == '9') break;  // 9면 더 검색할 필요 X
                }
            }

            answer.append(maxChar);
            start = maxIdx + 1;
        }

        return answer.toString();
    }
}