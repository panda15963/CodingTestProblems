import java.util.*;

class Solution {
    public int maximumSaleItems(int[][] items, long budget) {
        int n = items.length;
        int maxFactor = 0;
        long minPrice = Long.MAX_VALUE;

        for (int[] item : items) {
            maxFactor = Math.max(maxFactor, item[0]);
            minPrice = Math.min(minPrice, item[1]);
        }

        int[] cntFactor = new int[maxFactor + 1];
        for (int[] item : items) {
            cntFactor[item[0]]++;
        }

        int[] cntMulti = new int[maxFactor + 1];
        TreeMap<Long, Long> bonusByPrice = new TreeMap<>();

        for (int[] item : items) {
            int factor = item[0];
            long price = item[1];

            if (price >= minPrice * 2) continue;

            if (cntMulti[factor] == 0) {
                for (int mult = factor; mult <= maxFactor; mult += factor) {
                    cntMulti[factor] += cntFactor[mult];
                }
            }

            long freeCount = cntMulti[factor] - 1;
            if (freeCount > 0) {
                bonusByPrice.merge(price, freeCount, Long::sum);
            }
        }

        long totalItems = 0;
        for (Map.Entry<Long, Long> entry : bonusByPrice.entrySet()) {
            long price = entry.getKey();
            long availableFree = entry.getValue();
            if (budget < price) break;

            long buyCount = Math.min(availableFree, budget / price);
            budget -= buyCount * price;
            totalItems += buyCount * 2;
        }

        totalItems += budget / minPrice;
        return (int) totalItems;
    }
}
