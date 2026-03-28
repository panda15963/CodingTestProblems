import java.util.*;

class Solution {
    public int solution(int distance, int[] rocks, int n) {
        Arrays.sort(rocks);

        int left = 1;
        int right = distance;
        int answer = 0;

        while (left <= right) {
            int mid = (left + right) / 2;

            int removed = 0;
            int prev = 0; // 시작점

            for (int rock : rocks) {
                if (rock - prev < mid) {
                    removed++; // 제거
                } else {
                    prev = rock; // 유지
                }
            }

            // 마지막 구간 (도착지점)
            if (distance - prev < mid) {
                removed++;
            }

            if (removed > n) {
                // 너무 많이 제거 → 거리 너무 큼
                right = mid - 1;
            } else {
                // 가능 → 더 크게 시도
                answer = mid;
                left = mid + 1;
            }
        }

        return answer;
    }
}