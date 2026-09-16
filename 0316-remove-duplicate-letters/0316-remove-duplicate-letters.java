import java.util.*;

class Solution {
    public String removeDuplicateLetters(String s) {
        int[] counter = new int[26];

        for (char c : s.toCharArray()) {
            counter[c - 'a']++;
        }

        Stack<Character> stack = new Stack<>();
        boolean[] visited = new boolean[26];

        for (char c : s.toCharArray()) {
            counter[c - 'a']--;

            if (visited[c - 'a']) {
                continue;
            }

            while (!stack.isEmpty()
                    && c < stack.peek()
                    && counter[stack.peek() - 'a'] > 0) {

                char top = stack.pop();
                visited[top - 'a'] = false;
            }

            stack.push(c);
            visited[c - 'a'] = true;
        }

        StringBuilder ans = new StringBuilder();

        while (!stack.isEmpty()) {
            ans.append(stack.pop());
        }

        return ans.reverse().toString();
    }
}