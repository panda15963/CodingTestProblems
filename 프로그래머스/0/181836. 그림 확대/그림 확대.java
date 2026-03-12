import java.util.*;

class Solution {
    public String[] solution(String[] picture, int k) {
        List<String> result = new ArrayList<>();
        for (String row : picture) {
            StringBuilder newRow = new StringBuilder();
            for (char c : row.toCharArray()) {
                for (int i = 0; i < k; i++) {
                    newRow.append(c);
                }
            }
            String repeatedRow = newRow.toString();
            for (int i = 0; i < k; i++) {
                result.add(repeatedRow);
            }
        }
        return result.toArray(new String[0]);
    }
}
