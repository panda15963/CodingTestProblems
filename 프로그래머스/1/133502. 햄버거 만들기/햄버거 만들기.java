import java.util.Stack;

class Solution {
    public int solution(int[] ingredient) {
        int answer = 0;
        Stack<Integer> stack = new Stack<>();
        
        for (int item : ingredient) {
            stack.push(item);
            
            // 스택에 쌓인 재료가 4개 이상이고, 최근 4개의 재료가 "1, 2, 3, 1" 형태일 때
            if (stack.size() >= 4) {
                if (stack.get(stack.size() - 4) == 1 &&
                    stack.get(stack.size() - 3) == 2 &&
                    stack.get(stack.size() - 2) == 3 &&
                    stack.get(stack.size() - 1) == 1) {
                    
                    // 햄버거를 만들었으므로 재료 4개를 스택에서 제거
                    stack.pop();
                    stack.pop();
                    stack.pop();
                    stack.pop();
                    
                    answer++;
                }
            }
        }
        
        return answer;
    }
}