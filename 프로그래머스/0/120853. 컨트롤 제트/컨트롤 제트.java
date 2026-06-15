import java.util.Stack;

class Solution {
    public int solution(String s) {
        Stack<Integer> stack = new Stack<>();

        String[] tokens = s.split(" ");

        for (String token : tokens) {
            if (token.equals("Z")) {
                stack.pop(); // 직전에 더했던 숫자 제거
            } else {
                stack.push(Integer.parseInt(token));
            }
        }

        int answer = 0;
        while (!stack.isEmpty()) {
            answer += stack.pop();
        }

        return answer;
    }
}