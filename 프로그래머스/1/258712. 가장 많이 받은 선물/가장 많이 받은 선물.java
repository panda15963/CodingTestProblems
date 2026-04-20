import java.util.*;

class Solution {
    public int solution(String[] friends, String[] gifts) {
        int n = friends.length;
        Map<String, Integer> nameMap = new HashMap<>();
        for (int i = 0; i < n; i++) nameMap.put(friends[i], i);

        int[][] record = new int[n][n]; // [준사람][받은사람]
        int[] giftScore = new int[n];

        // 1. 선물 기록 및 선물 지수 계산
        for (String gift : gifts) {
            String[] split = gift.split(" ");
            int from = nameMap.get(split[0]);
            int to = nameMap.get(split[1]);
            record[from][to]++;
            giftScore[from]++;
            giftScore[to]--;
        }

        // 2. 다음 달 선물 계산
        int[] nextMonth = new int[n];
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int iToJ = record[i][j];
                int jToI = record[j][i];

                if (iToJ > jToI) nextMonth[i]++;
                else if (jToI > iToJ) nextMonth[j]++;
                else { // 주고받은 수가 같거나 없을 때
                    if (giftScore[i] > giftScore[j]) nextMonth[i]++;
                    else if (giftScore[j] > giftScore[i]) nextMonth[j]++;
                }
            }
        }

        // 3. 가장 많이 받은 선물 수
        int maxGift = 0;
        for (int count : nextMonth) maxGift = Math.max(maxGift, count);
        return maxGift;
    }
}
