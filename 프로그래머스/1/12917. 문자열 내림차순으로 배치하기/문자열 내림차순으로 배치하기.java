import java.util.Arrays;
import java.util.Collections;

class Solution {
    public String solution(String s) {
        String[] arr = s.split("");

        Arrays.sort(arr, Collections.reverseOrder());

        StringBuilder answer = new StringBuilder();

        for (String str : arr) {
            answer.append(str);
        }

        return answer.toString();
    }
}