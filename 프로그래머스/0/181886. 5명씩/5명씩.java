import java.util.*;

class Solution {
    public List<String> solution(String[] names) {
        List<String> answer = new ArrayList<>();
        
        for (int i = 0; i < names.length; i += 5) {
            answer.add(names[i]);
        }
        
        return answer;
    }
}