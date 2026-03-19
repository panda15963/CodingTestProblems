import java.util.Arrays;

class Solution {
    public String solution(String my_string) {
        // 1. 소문자로 변환 → 2. 문자 배열로 변환 → 3. 정렬 → 4. 다시 문자열로 변환
        char[] chars = my_string.toLowerCase().toCharArray();
        Arrays.sort(chars);
        return new String(chars);
    }
}
