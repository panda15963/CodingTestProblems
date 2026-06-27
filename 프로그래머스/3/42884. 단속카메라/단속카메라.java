import java.util.Arrays;

class Solution {
    public int solution(int[][] routes) {
        // 1. 진출 지점 기준 오름차순 정렬
        Arrays.sort(routes, (a, b) -> Integer.compare(a[1], b[1]));

        int camera = routes[0][1]; // 첫 번째 카메라 위치
        int answer = 1;

        for (int i = 1; i < routes.length; i++) {
            int start = routes[i][0];
            int end = routes[i][1];

            // 현재 카메라로 커버할 수 없으면 새 카메라 설치
            if (start > camera) {
                camera = end;
                answer++;
            }
            // start <= camera 이면 기존 카메라로 커버 가능
        }

        return answer;
    }
}