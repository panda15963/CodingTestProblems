import java.util.*;

class Solution {
    public int solution(int[] array) {
        int[] freq = new int[1000];
        for (int num : array) {
            freq[num]++;
        }
        int maxCnt = 0;
        for (int f : freq) {
            if (f > maxCnt) maxCnt = f;
        }
        int count = 0;
        for (int num = 0; num < 1000; num++) {
            if (freq[num] == maxCnt) {
                count++;
                if (count > 1) return -1;
            }
        }
        for (int num = 0; num < 1000; num++) {
            if (freq[num] == maxCnt) return num;
        }
        return -1; // 불가능
    }
}
