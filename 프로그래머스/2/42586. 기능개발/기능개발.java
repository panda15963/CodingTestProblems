import java.util.*;

public class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        ArrayList<Integer> answer = new ArrayList<>();
        int[] days = new int[progresses.length];

        for (int i = 0; i < progresses.length; i++) {
            days[i] = (int) Math.ceil((100.0 - progresses[i]) / speeds[i]);
        }

        int current = days[0];
        int count = 1;

        for (int i = 1; i < days.length; i++) {
            if (days[i] <= current) {
                count++;
            } else {
                answer.add(count);
                current = days[i];
                count = 1;
            }
        }

        answer.add(count);

        int[] result = new int[answer.size()];
        for (int i = 0; i < answer.size(); i++) {
            result[i] = answer.get(i);
        }
        return result;
    }
}
