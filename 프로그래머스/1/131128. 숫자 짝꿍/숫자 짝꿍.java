import java.util.HashMap;
import java.util.Map;

class Solution {
    public String solution(String X, String Y) {
        // 1. 각 숫자의 등장 횟수를 저장할 배열 (0~9)
        int[] countX = new int[10];
        int[] countY = new int[10];

        // 2. X와 Y의 각 숫자 빈도수 카운트
        for (char c : X.toCharArray()) {
            countX[c - '0']++;
        }
        for (char c : Y.toCharArray()) {
            countY[c - '0']++;
        }

        // 3. 짝꿍 문자열 생성
        StringBuilder sb = new StringBuilder();
        for (int i = 9; i >= 0; i--) {
            int commonCount = Math.min(countX[i], countY[i]);
            for (int j = 0; j < commonCount; j++) {
                sb.append(i);
            }
        }

        // 4. 예외 처리
        if (sb.length() == 0) {
            return "-1";
        } else if (sb.charAt(0) == '0') {
            return "0"; // "00", "000"과 같은 경우 "0"으로 반환
        }

        return sb.toString();
    }
}