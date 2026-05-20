import java.util.HashSet;
import java.util.Set;

class Solution {
    public int solution(int[] elements) {
        Set<Integer> set = new HashSet<>();
        int n = elements.length;
        
        // 원형 수열 처리를 위해 기존 배열을 2배 크기로 확장
        int[] circularElements = new int[n * 2];
        for (int i = 0; i < n; i++) {
            circularElements[i] = elements[i];
            circularElements[i + n] = elements[i];
        }
        
        // 부분 수열의 길이 (1부터 n까지)
        for (int len = 1; len <= n; len++) {
            // 시작 인덱스 (0부터 n-1까지)
            for (int i = 0; i < n; i++) {
                int sum = 0;
                // 부분 수열의 합 계산
                for (int j = i; j < i + len; j++) {
                    sum += circularElements[j];
                }
                set.add(sum);
            }
        }
        
        return set.size();
    }
}
