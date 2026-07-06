import java.util.*;

class Solution {

    public int[] solution(String msg) {

        List<Integer> answer = new ArrayList<>();
        HashMap<String, Integer> map = new HashMap<>();

        int index = 1;

        // A ~ Z 초기화
        for (; index < 27; index++) {
            map.put(String.valueOf((char) ('A' + index - 1)), index);
        }

        for (int i = 0; i < msg.length(); i++) {

            String temp = String.valueOf(msg.charAt(i));

            int j = i;
            int count = 0;

            while (map.containsKey(temp)) {

                count++;
                j++;

                if (j >= msg.length()) {
                    break;
                }

                temp += msg.charAt(j);
            }

            i += count - 1;

            if (!map.containsKey(temp)) {
                map.put(temp, index++);
                temp = temp.substring(0, temp.length() - 1);
            }

            answer.add(map.get(temp));
        }

        return answer.stream().mapToInt(Integer::intValue).toArray();
    }
}