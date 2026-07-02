import java.util.*;

class Solution {

    static int[] cnt = new int[360000];

    // "00:00:00" -> 초
    static int strToInt(String s) {
        int hour = Integer.parseInt(s.substring(0, 2));
        int min = Integer.parseInt(s.substring(3, 5));
        int sec = Integer.parseInt(s.substring(6, 8));

        return hour * 3600 + min * 60 + sec;
    }

    // 초 -> "00:00:00"
    static String intToStr(int time) {
        int sec = time % 60;
        time /= 60;
        int min = time % 60;
        time /= 60;
        int hour = time;

        return String.format("%02d:%02d:%02d", hour, min, sec);
    }

    public String solution(String play_time, String adv_time, String[] logs) {

        Arrays.fill(cnt, 0);

        for (String log : logs) {

            int start = strToInt(log.substring(0, 8));
            int end = strToInt(log.substring(9));

            for (int i = start; i < end; i++) {
                cnt[i]++;
            }
        }

        int playTime = strToInt(play_time);
        int advTime = strToInt(adv_time);

        Queue<Integer> queue = new LinkedList<>();

        int index = 0;
        long sum = 0;
        long max = 0;

        for (int i = 0; i < advTime; i++) {
            sum += cnt[i];
            queue.offer(cnt[i]);
        }

        max = sum;

        for (int i = advTime; i < playTime; i++) {

            sum -= queue.poll();
            sum += cnt[i];
            queue.offer(cnt[i]);

            if (sum > max) {
                max = sum;
                index = i - advTime + 1;
            }
        }

        return intToStr(index);
    }
}