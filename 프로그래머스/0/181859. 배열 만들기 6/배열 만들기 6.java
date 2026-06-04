import java.util.ArrayList;
import java.util.List;

class Solution {
    public int[] solution(int[] arr) {
        List<Integer> stk = new ArrayList<>();
        
        for (int i = 0; i < arr.length; i++) {
            if (stk.isEmpty() || stk.get(stk.size() - 1) != arr[i]) {
                stk.add(arr[i]); // 스택이 비었거나 마지막 원소와 다르면 추가
            } else {
                stk.remove(stk.size() - 1); // 마지막 원소와 같으면 제거
            }
        }
        
        // 결과가 비어있으면 [-1] 반환, 아니면 배열로 변환
        return stk.isEmpty() ? new int[]{-1} : stk.stream().mapToInt(Integer::intValue).toArray();
    }
}
