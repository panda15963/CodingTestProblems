class Solution {
    public int solution(int n, int[] cores) {
        if (n <= cores.length) {
            return n;
        }

        n -= cores.length;

        long left = 1;
        long right = (long) getMax(cores) * n;

        while (left < right) {
            long mid = (left + right) / 2;

            long capacity = 0;

            for (int core : cores) {
                capacity += mid / core;
            }

            if (capacity >= n) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        for (int core : cores) {
            n -= (right - 1) / core;
        }

        for (int i = 0; i < cores.length; i++) {
            if (right % cores[i] == 0) {
                n--;

                if (n == 0) {
                    return i + 1;
                }
            }
        }

        return -1;
    }

    private int getMax(int[] cores) {
        int max = cores[0];

        for (int core : cores) {
            max = Math.max(max, core);
        }

        return max;
    }
}