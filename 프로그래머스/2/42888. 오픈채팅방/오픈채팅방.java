import java.util.*;
import java.util.stream.Collectors;

class Solution {
    public String[] solution(String[] record) {
        Map<String, String> map = new HashMap<>();
        List<String[]> splitRecord = Arrays.stream(record).map(r -> r.split(" ")).collect(Collectors.toList());

        for (String[] r : splitRecord) {
            if (r[0].equals("Enter") || r[0].equals("Change")) {
                map.put(r[1], r[2]);
            }
        }

        List<String> result = new ArrayList<>();

        for (String[] r : splitRecord) {
            switch (r[0]) {
                case "Enter":
                    result.add(String.format("%s님이 들어왔습니다.", map.get(r[1])));
                    break;
                case "Leave":
                    result.add(String.format("%s님이 나갔습니다.", map.get(r[1])));
                    break;
            }
        }
        return result.toArray(new String[0]);
    }
}