import java.util.*;

class Solution {
    public String solution(int[] numbers) {
        String[] strNums = new String[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            strNums[i] = String.valueOf(numbers[i]);
        }
        
        // 두 문자열을 결합하여 더 큰 값이 나오는 순서대로 정렬
        Arrays.sort(strNums, (o1, o2) -> (o2 + o1).compareTo(o1 + o2));
        
        // 첫 번째 숫자가 '0'이면 모든 숫자가 0이라는 뜻
        if (strNums[0].equals("0")) {
            return "0";
        }
        
        StringBuilder answer = new StringBuilder();
        for (String num : strNums) {
            answer.append(num);
        }
        
        return answer.toString();
    }
}
