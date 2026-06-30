import java.util.*;

class Solution {
    public int solution(String[] want, int[] number, String[] discount) {
        int answer = 0;
        int totalDays = 10;

        // 구매하고자 하는 품목과 수량을 Map으로 저장
        Map<String, Integer> wantMap = new HashMap<>();
        for (int i = 0; i < want.length; i++) {
            wantMap.put(want[i], number[i]);
        }

        // 첫 10일간의 할인 품목 개수 저장
        Map<String, Integer> currentMap = new HashMap<>();
        for (int i = 0; i < totalDays; i++) {
            currentMap.put(discount[i], currentMap.getOrDefault(discount[i], 0) + 1);
        }

        // 첫 번째 윈도우 확인
        if (checkMatch(wantMap, currentMap)) {
            answer++;
        }

        // 슬라이딩 윈도우
        for (int i = totalDays; i < discount.length; i++) {
            // 1. 빠지는 상품
            String prevItem = discount[i - totalDays];
            currentMap.put(prevItem, currentMap.get(prevItem) - 1);

            // 2. 새로 들어오는 상품
            String nextItem = discount[i];
            currentMap.put(nextItem, currentMap.getOrDefault(nextItem, 0) + 1);

            // 3. 원하는 목록과 일치하는지 확인
            if (checkMatch(wantMap, currentMap)) {
                answer++;
            }
        }

        return answer;
    }

    // 현재 할인 목록이 원하는 목록과 일치하는지 확인
    private boolean checkMatch(Map<String, Integer> wantMap, Map<String, Integer> currentMap) {
        for (Map.Entry<String, Integer> entry : wantMap.entrySet()) {
            if (!currentMap.getOrDefault(entry.getKey(), 0).equals(entry.getValue())) {
                return false;
            }
        }
        return true;
    }
}