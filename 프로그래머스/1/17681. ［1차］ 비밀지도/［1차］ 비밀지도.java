class Solution {

    public String[] solution(int n, int[] arr1, int[] arr2) {

        String[] answer = new String[n];

        for (int i = 0; i < n; i++) {

            // 비트 OR 연산
            int value = arr1[i] | arr2[i];

            // 2진수 문자열
            String binary = Integer.toBinaryString(value);

            // 앞을 0으로 채우기
            while (binary.length() < n) {
                binary = "0" + binary;
            }

            StringBuilder sb = new StringBuilder();

            // 1 -> #, 0 -> 공백
            for (int j = 0; j < n; j++) {
                if (binary.charAt(j) == '1') {
                    sb.append('#');
                } else {
                    sb.append(' ');
                }
            }

            answer[i] = sb.toString();
        }

        return answer;
    }
}