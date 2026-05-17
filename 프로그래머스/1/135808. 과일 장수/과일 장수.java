import java.util.Arrays;

class Solution {
    public int solution(int k, int m, int[] score) {
        // 1. 사과 점수를 오름차순으로 정렬
        Arrays.sort(score);
        
        int answer = 0;
        
        // 2. 뒤에서부터 m개씩 묶어서 계산
        for (int i = score.length - m; i >= 0; i -= m) {
            // 정렬된 배열에서 묶음의 시작점(가장 낮은 점수) * 상자에 담긴 개수(m)
            answer += score[i] * m;
        }
        
        return answer;
    }
}
