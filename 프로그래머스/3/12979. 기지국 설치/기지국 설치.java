import java.util.*;

class Solution {
    public int solution(int n, int[] stations, int w) {
        int answer = 0;
        int start = 0; // 기지국 시작
        int end = 0; // 기지국 끝
        int cur = 1; // 현재 위치
        int range = 2*w + 1; // 전파 범위
        int diff = 0;

        for(int i=0;i<stations.length;i++) { // 이미 설치된 기지국이 미치는 범위까지만 탐색
            start = stations[i]-w;
            end = stations[i]+w;
            if(cur < start) {
                diff = start - cur;
                if(diff % range == 0) {
                    answer += diff / range;
                } else {
                    answer += diff / range + 1;
                }
            }
            cur = end + 1;
        }

        if(cur <= n) { // 설치된 기지국 뒤에 전파 없는 범위 탐색
            diff = n - cur + 1;
            if(diff % range == 0) {
                answer += diff / range;
            } else {
                answer += diff / range + 1;
            }
        }
        return answer;
    }
}