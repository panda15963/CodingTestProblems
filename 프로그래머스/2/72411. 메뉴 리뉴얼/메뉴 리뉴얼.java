import java.util.*;

class Solution {

    Map<String, Integer> map = new HashMap<>();

    public String[] solution(String[] orders, int[] course) {

        for (String order : orders) {

            char[] chars = order.toCharArray();
            Arrays.sort(chars);

            for (int size : course) {

                if (chars.length >= size) {
                    combination(chars, size, 0, new StringBuilder());
                }
            }
        }

        List<String> answer = new ArrayList<>();

        for (int size : course) {

            int max = 1;
            List<String> result = new ArrayList<>();

            for (String key : map.keySet()) {

                if (key.length() != size) continue;

                int cnt = map.get(key);

                if (cnt == max && max > 1) {
                    result.add(key);
                } else if (cnt > max) {
                    max = cnt;
                    result.clear();
                    result.add(key);
                }
            }

            answer.addAll(result);
        }

        Collections.sort(answer);

        return answer.toArray(new String[0]);
    }

    void combination(char[] arr, int target, int idx, StringBuilder sb) {

        if (sb.length() == target) {

            String key = sb.toString();

            map.put(key, map.getOrDefault(key, 0) + 1);

            return;
        }

        for (int i = idx; i < arr.length; i++) {

            sb.append(arr[i]);

            combination(arr, target, i + 1, sb);

            sb.deleteCharAt(sb.length() - 1);
        }
    }

}