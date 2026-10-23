class Solution {
    public int findRadius(int[] houses, int[] heaters) {
        Arrays.sort(houses);
        Arrays.sort(heaters);

        int left = 0, right = 1000000000;
        int firstTrueIndex = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (feasible(houses, heaters, mid)) {
                firstTrueIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return firstTrueIndex;
    }

    private boolean feasible(int[] houses, int[] heaters, int radius) {
        int houseIdx = 0;
        int heaterIdx = 0;

        while (houseIdx < houses.length) {
            if (heaterIdx >= heaters.length) {
                return false;
            }

            int minCoverage = heaters[heaterIdx] - radius;
            int maxCoverage = heaters[heaterIdx] + radius;

            if (houses[houseIdx] < minCoverage) {
                return false;
            }
            if (houses[houseIdx] > maxCoverage) {
                heaterIdx++;
            } else {
                houseIdx++;
            }
        }

        return true;
    }
}
