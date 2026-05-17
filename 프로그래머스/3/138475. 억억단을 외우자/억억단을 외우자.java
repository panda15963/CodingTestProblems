class Solution {
    public int[] solution(int e, int[] starts) {
        // 1. 각 숫자의 약수의 개수 저장
        int[] counts = new int[e + 1];
        for (int i = 1; i <= e; i++) {
            for (int j = i; j <= e; j += i) {
                counts[j]++;
            }
        }

        // 2. e부터 1까지 뒤에서부터 최빈값 및 가장 작은 수 미리 계산
        int[] maxNum = new int[e + 1];
        int maxVal = -1;
        int maxIndex = -1;

        for (int i = e; i >= 1; i--) {
            if (counts[i] >= maxVal) {
                maxVal = counts[i];
                maxIndex = i;
            }
            maxNum[i] = maxIndex;
        }

        // 3. starts 배열을 순회하며 정답 추출
        int[] answer = new int[starts.length];
        for (int i = 0; i < starts.length; i++) {
            answer[i] = maxNum[starts[i]];
        }

        return answer;
    }
}
