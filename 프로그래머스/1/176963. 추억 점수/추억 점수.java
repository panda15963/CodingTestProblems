import java.util.*;

class Solution {
    public int[] solution(String[] name, int[] yearning, String[][] photo) {
        // 1. 이름과 그리움 점수를 매핑 (Map 사용)
        Map<String, Integer> map = new HashMap<>();
        for (int i = 0; i < name.length; i++) {
            map.put(name[i], yearning[i]);
        }

        int[] result = new int[photo.length];
        
        // 2. 사진 순회
        for (int i = 0; i < photo.length; i++) {
            int score = 0;
            // 3. 사진 속 인물의 점수 합산
            for (String person : photo[i]) {
                score += map.getOrDefault(person, 0); // 없는 인물은 0점
            }
            result[i] = score;
        }
        
        return result;
    }
}
