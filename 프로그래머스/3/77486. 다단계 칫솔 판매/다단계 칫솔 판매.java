import java.util.*;

class Solution {
    public int[] solution(String[] enroll, String[] referral, String[] seller, int[] amount) {

        Map<String, String> refMap = new HashMap<>();
        Map<String, Integer> amountMap = new HashMap<>();

        // 추천인 정보 저장
        for (int i = 0; i < enroll.length; i++) {
            refMap.put(enroll[i], referral[i]);
        }

        // 판매 처리
        for (int i = 0; i < seller.length; i++) {
            String giver = seller[i];
            String getter = refMap.get(giver);

            int profit = amount[i] * 100;

            while (!getter.equals("-") && profit != 0) {
                amountMap.put(
                    giver,
                    amountMap.getOrDefault(giver, 0) + (profit - profit / 10)
                );

                profit /= 10;
                giver = getter;
                getter = refMap.get(giver);
            }

            amountMap.put(
                giver,
                amountMap.getOrDefault(giver, 0) + (profit - profit / 10)
            );
        }

        int[] answer = new int[enroll.length];

        for (int i = 0; i < enroll.length; i++) {
            answer[i] = amountMap.getOrDefault(enroll[i], 0);
        }

        return answer;
    }
}