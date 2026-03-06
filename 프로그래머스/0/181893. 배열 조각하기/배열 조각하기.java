import java.util.*;

class Solution {
    public int[] solution(int[] arr, int[] query) {
        List<Integer> list = new ArrayList<>();
        for (int num : arr) {
            list.add(num);
        }
        
        for (int i = 0; i < query.length; i++) {
            if (i % 2 == 0) {
                // 짝수 인덱스: query[i] 이후 제거
                while (list.size() > query[i] + 1) {
                    list.remove(list.size() - 1);
                }
            } else {
                // 홀수 인덱스: query[i] 이전 제거
                int removeCount = query[i];
                while (removeCount > 0) {
                    list.remove(0);
                    removeCount--;
                }
            }
        }
        
        return list.stream().mapToInt(Integer::intValue).toArray();
    }
}
