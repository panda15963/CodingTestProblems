import java.util.ArrayList;

class Solution {
    public int[] solution(int[] arr) {
        ArrayList<Integer> list = new ArrayList<>();
        
        // arr의 각 원소를 순회
        for (int a : arr) {
            // 원소의 값만큼 해당 값을 list에 추가
            for (int i = 0; i < a; i++) {
                list.add(a);
            }
        }
        
        // ArrayList를 int[] 배열로 변환
        int[] answer = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            answer[i] = list.get(i);
        }
        
        return answer;
    }
}
