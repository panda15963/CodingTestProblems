import java.util.*;

class Solution {
    public int solution(int coin, int[] cards) {
        int n = cards.length;
        int initCount = n / 3;

        Set<Integer> myCards = new HashSet<>();
        Set<Integer> keepCards = new HashSet<>();

        // 1. 초기 카드 설정
        for (int i = 0; i < initCount; i++) {
            myCards.add(cards[i]);
        }

        int currentCoin = coin;
        int round = 1;
        int deckIdx = initCount;

        while (deckIdx < n) {
            // 매 라운드 카드 2장 뽑기
            int draw1 = cards[deckIdx++];
            int draw2 = cards[deckIdx++];

            keepCards.add(draw1);
            keepCards.add(draw2);

            boolean advanced = false;

            // 1. 내 카드 두 장 사용 (코인 0개)
            for (Integer card : new HashSet<>(myCards)) {
                int target = (n + 1) - card;

                if (card != target && myCards.contains(target)) {
                    myCards.remove(card);
                    myCards.remove(target);
                    advanced = true;
                    break;
                }
            }

            // 2. 내 카드 + 보관 카드 (코인 1개)
            if (!advanced) {
                for (Integer myCard : new HashSet<>(myCards)) {
                    int target = (n + 1) - myCard;

                    if (keepCards.contains(target) && currentCoin >= 1) {
                        myCards.remove(myCard);
                        keepCards.remove(target);
                        currentCoin--;
                        advanced = true;
                        break;
                    }
                }
            }

            // 3. 보관 카드 두 장 (코인 2개)
            if (!advanced) {
                for (Integer keepCard : new HashSet<>(keepCards)) {
                    int target = (n + 1) - keepCard;

                    if (keepCard != target &&
                        keepCards.contains(target) &&
                        currentCoin >= 2) {

                        keepCards.remove(keepCard);
                        keepCards.remove(target);
                        currentCoin -= 2;
                        advanced = true;
                        break;
                    }
                }
            }

            // 4. 진행 불가
            if (!advanced) {
                break;
            }

            round++;
        }

        return round;
    }
}