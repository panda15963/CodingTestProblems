import java.util.ArrayList;
import java.util.List;

class Solution {
    public double[] solution(int k, int[][] ranges) {
        // 1. 우박수열(y값) 생성
        List<Integer> yList = new ArrayList<>();
        yList.add(k);
        while (k > 1) {
            if (k % 2 == 0) {
                k /= 2;
            } else {
                k = k * 3 + 1;
            }
            yList.add(k);
        }

        int n = yList.size() - 1; // 총 이동 횟수 (n)
        
        // 2. 각 구간의 정적분(넓이) 미리 계산
        double[] areas = new double[n];
        for (int i = 0; i < n; i++) {
            double y1 = yList.get(i);
            double y2 = yList.get(i + 1);
            areas[i] = (y1 + y2) / 2.0; // 사다리꼴 넓이 공식 (윗변+아랫변)/2 * 높이(1)
        }

        // 3. 누적합 배열 생성 (구간 합을 빠르게 구하기 위함)
        double[] prefixSum = new double[n + 1];
        prefixSum[0] = 0;
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + areas[i];
        }

        // 4. 각 범위(ranges)에 대한 정적분 결과 계산
        double[] answer = new double[ranges.length];
        for (int i = 0; i < ranges.length; i++) {
            int start = ranges[i][0];
            int end = n + ranges[i][1]; // 음수 범위 고려

            if (start > end) {
                answer[i] = -1.0; // 유효하지 않은 구간
            } else {
                answer[i] = prefixSum[end] - prefixSum[start];
            }
        }

        return answer;
    }
}
