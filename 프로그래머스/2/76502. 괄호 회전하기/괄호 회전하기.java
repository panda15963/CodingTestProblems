import java.util.*;

class Solution {

    private boolean isCorrect(String s) {
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {

            if (!stack.isEmpty()) {

                boolean matched = false;

                switch (stack.peek()) {
                    case '[':
                        if (c == ']') {
                            matched = true;
                            stack.pop();
                        }
                        break;

                    case '{':
                        if (c == '}') {
                            matched = true;
                            stack.pop();
                        }
                        break;

                    case '(':
                        if (c == ')') {
                            matched = true;
                            stack.pop();
                        }
                        break;
                }

                if (matched) {
                    continue;
                }
            }

            stack.push(c);
        }

        return stack.isEmpty();
    }

    public int solution(String s) {

        int answer = 0;

        for (int i = 0; i < s.length(); i++) {

            if (isCorrect(s)) {
                answer++;
            }

            char first = s.charAt(0);
            s = s.substring(1) + first;
        }

        return answer;
    }
}