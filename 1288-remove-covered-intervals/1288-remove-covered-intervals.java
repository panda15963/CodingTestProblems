import java.util.*;

class Solution {

    public int removeCoveredIntervals(int[][] intervals) {

        Arrays.sort(intervals, (a, b) -> {
            if (a[0] == b[0]) {
                return b[1] - a[1];
            }
            return a[0] - b[0];
        });

        int end = intervals[0][1];
        int count = 0;

        for (int i = 1; i < intervals.length; i++) {

            if (end >= intervals[i][1]) {
                count++;
            } else {
                end = intervals[i][1];
            }
        }

        return intervals.length - count;
    }
}