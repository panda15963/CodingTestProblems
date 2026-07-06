import java.util.*;

class Solution {

    public int solution(String[] lines) {

        List<double[]> periods = new ArrayList<>();

        // 각 로그의 처리 구간 계산
        for (String log : lines) {
            periods.add(convertTime(log));
        }

        int answer = 0;

        // 시작 시간과 종료 시간을 기준으로 처리량 계산
        for (double[] period : periods) {
            answer = Math.max(answer, throughput(period[0], periods));
            answer = Math.max(answer, throughput(period[1], periods));
        }

        return answer;
    }

    // 로그를 [시작시간, 종료시간]으로 변환
    private double[] convertTime(String line) {

        String[] arr = line.split(" ");

        String time = arr[1];
        String elapse = arr[2];

        String[] hms = time.split(":");

        int hour = Integer.parseInt(hms[0]) * 60 * 60 * 1000;
        int minute = Integer.parseInt(hms[1]) * 60 * 1000;

        String[] sec = hms[2].split("\\.");

        int second = Integer.parseInt(sec[0]) * 1000;
        int millisecond = Integer.parseInt(sec[1]);

        double endTime = hour + minute + second + millisecond;

        double processTime =
                Double.parseDouble(elapse.substring(0, elapse.length() - 1)) * 1000;

        double startTime = endTime - processTime + 1;

        return new double[]{startTime, endTime};
    }

    // 특정 시점부터 1초 동안의 처리량 계산
    private int throughput(double startTime, List<double[]> periods) {

        int count = 0;

        double startRange = startTime;
        double endRange = startTime + 999;

        for (double[] period : periods) {

            double startPoint = period[0];
            double endPoint = period[1];

            if (!(endRange < startPoint || endPoint < startRange)) {
                count++;
            }
        }

        return count;
    }
}