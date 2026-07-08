import java.util.Arrays;
import java.util.Collections;

class Solution {
    public long solution(long n) {
        // 1. 정수를 문자열로 변환하여 각 자릿수를 나누기
        String str = Long.toString(n);

        // 2. 문자열을 문자 배열로 변환
        String[] arr = str.split("");

        // 3. 배열을 내림차순으로 정렬
        Arrays.sort(arr, Collections.reverseOrder());

        // 4. 정렬된 배열을 다시 문자열로 합치기
        StringBuilder sb = new StringBuilder();
        for (String s : arr) {
            sb.append(s);
        }

        // 5. 최종 문자열을 다시 long 타입 정수로 변환
        return Long.parseLong(sb.toString());
    }
}