import java.util.*;

class Solution {
    public int solution(int[][] data, int col, int row_begin, int row_end) {
        // 1. 정렬: col 기준 오름차순, 동일시 0번 컬럼 내림차순
        Arrays.sort(data, (o1, o2) -> {
            if (o1[col - 1] == o2[col - 1]) {
                return o2[0] - o1[0]; // 기본키 내림차순
            }
            return o1[col - 1] - o2[col - 1]; // col 기준 오름차순
        });

        int answer = 0;
        // 2. row_begin ~ row_end 범위 합 및 XOR
        for (int i = row_begin; i <= row_end; i++) {
            int s_i = 0;
            for (int val : data[i - 1]) {
                s_i += (val % i);
            }
            
            // 3. XOR 연산
            answer ^= s_i;
        }
        
        return answer;
    }
}
