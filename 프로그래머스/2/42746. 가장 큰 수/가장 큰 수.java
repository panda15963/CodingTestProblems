import java.util.*;

class Solution {
    public String solution(int[] numbers) {
        String[] arr = new String[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            arr[i] = String.valueOf(numbers[i]);
        }
        Arrays.sort(arr, (String a, String b) -> {
            return (b + a).compareTo(a + b);
        });
        StringBuilder sb = new StringBuilder();
        for (String s : arr) sb.append(s);
        String answer = sb.toString();
        return answer.replaceAll("^0+", "").isEmpty() ? "0" : answer.replaceAll("^0+", "");
    }
}
