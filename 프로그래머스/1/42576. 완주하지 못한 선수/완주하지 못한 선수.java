import java.util.Arrays;

class Solution {
    public String solution(String[] participant, String[] completion) {
        Arrays.sort(participant);
        Arrays.sort(completion);
        for (int i = 0; i < participant.length; i++) {
            if (i == completion.length || !participant[i].equals(completion[i])) {
                return participant[i];
            }
        }
        return "";
    }
}
