class Solution {
    public int[] solution(int N, int[] stages) {
        int[] answer = new int[N];
        double[] tempArr = new double[N];
        int arrLength = stages.length;
        int idx = arrLength; // 전체 플레이어 수 => 1번째 스테이지에 도달한 플레이어 수
        
        // 1. 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 초기화
        for (int stage : stages) {
            if (stage != N + 1)
                answer[stage - 1] += 1;
        }
        
        // 2. 
        for (int i = 0; i < N; i++) {
            int personNum = answer[i]; // 현재(i번째) 스테이지에 도달했지만 아직 클리하지 못한 플레이어의 수
            tempArr[i] = (double) personNum / idx; // 실패율 계산
            idx -= personNum; // "다음(i+1번째) 스테이지에 도달한 플레이어 수"를 구하기 위해 "현재(i번째) 스테이지에 도달했지만 아직 클리하지 못한 플레이어의 수"만큼 빼준다.
            answer[i] = i + 1; // 스테이지 번호(인덱스) 초기화
        }
        
        // 3. 실패율 배열(tempArr[])과 스테이지 번호(인덱스) 배열(answer[]) 정렬 - 실패율 배열의 값으로 내림차수
        double tempD = 0;
        int tempI = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 1; j < N - i; j++) {
                if (tempArr[j - 1] < tempArr[j]) {
                    tempD = tempArr[j - 1];
                    tempArr[j - 1] = tempArr[j];
                    tempArr[j] = tempD;

                    tempI = answer[j - 1];
                    answer[j - 1] = answer[j];
                    answer[j] = tempI;
                }
            }
        }
        return answer;
    }
}