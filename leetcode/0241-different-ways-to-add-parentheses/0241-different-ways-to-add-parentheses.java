import java.util.*;

class Solution {

    public List<Integer> diffWaysToCompute(String expression) {
        List<Integer> result = new ArrayList<>();

        // 연산자가 없는 경우 숫자 반환
        boolean hasOperator = false;

        for (int i = 0; i < expression.length(); i++) {
            char operator = expression.charAt(i);

            if (operator == '+' ||
                operator == '-' ||
                operator == '*') {

                hasOperator = true;

                // 왼쪽 부분 계산
                List<Integer> left =
                    diffWaysToCompute(expression.substring(0, i));

                // 오른쪽 부분 계산
                List<Integer> right =
                    diffWaysToCompute(expression.substring(i + 1));

                // 모든 가능한 조합 계산
                for (int l : left) {
                    for (int r : right) {
                        if (operator == '+') {
                            result.add(l + r);
                        } else if (operator == '-') {
                            result.add(l - r);
                        } else {
                            result.add(l * r);
                        }
                    }
                }
            }
        }

        // 연산자가 없는 경우 숫자
        if (!hasOperator) {
            result.add(Integer.parseInt(expression));
        }

        return result;
    }
}