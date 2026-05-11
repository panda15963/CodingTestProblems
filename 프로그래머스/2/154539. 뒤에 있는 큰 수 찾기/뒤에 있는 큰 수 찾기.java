import java.util.*;

class Solution {
    public int[] solution(int[] numbers) {
        int[] answer = new int[numbers.length];
        Stack<Integer> stack = new Stack<>();

        // 배열의 뒤에서부터 순회
        for (int i = numbers.length - 1; i >= 0; i--) {
            // 스택이 비지 않았고, 현재 수가 스택 최상단 수보다 크면 pop
            while (!stack.isEmpty() && stack.peek() <= numbers[i]) {
                stack.pop();
            }

            // 스택이 비어있으면 뒷큰수가 없음 (-1)
            if (stack.isEmpty()) {
                answer[i] = -1;
            } else {
                // 스택 최상단 수가 뒷큰수
                answer[i] = stack.peek();
            }

            // 현재 수를 스택에 추가
            stack.push(numbers[i]);
        }
        return answer;
    }
}
