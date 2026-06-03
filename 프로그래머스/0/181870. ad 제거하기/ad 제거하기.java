import java.util.*;

class Solution {
    public String[] solution(String[] strArr) {
        List<String> list = new ArrayList<>();
        
        for (String str : strArr) {
            if (!str.contains("ad")) { // "ad"가 포함되지 않은 경우만 추가
                list.add(str);
            }
        }
        
        return list.toArray(new String[0]);
    }
}
