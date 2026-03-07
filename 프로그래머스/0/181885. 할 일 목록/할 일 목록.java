import java.util.*;

class Solution {
    public List<String> solution(String[] todo_list, boolean[] finished) {
        List<String> answer = new ArrayList<>();
        
        for (int i = 0; i < todo_list.length; i++) {
            if (!finished[i]) {  // false인 경우만 추가
                answer.add(todo_list[i]);
            }
        }
        
        return answer;
    }
}
