import java.util.*;

class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> ans = new ArrayList<>();
        StringBuilder stack = new StringBuilder();

        backtrack(0, 0, n, stack, ans);

        return ans;
    }

    private void backtrack(
        int openN,
        int closedN,
        int n,
        StringBuilder stack,
        List<String> ans
    ) {
        // 여는 괄호와 닫는 괄호를 모두 사용한 경우
        if (openN == n && closedN == n) {
            ans.add(stack.toString());
            return;
        }

        // 여는 괄호 추가 가능
        if (openN < n) {
            stack.append('(');

            backtrack(openN + 1, closedN, n, stack, ans);

            // 백트래킹
            stack.deleteCharAt(stack.length() - 1);
        }

        // 닫는 괄호는 여는 괄호보다 적을 때만 추가 가능
        if (closedN < openN) {
            stack.append(')');

            backtrack(openN, closedN + 1, n, stack, ans);

            // 백트래킹
            stack.deleteCharAt(stack.length() - 1);
        }
    }
}