import java.util.*;

class Solution {
    public String solution(String my_string) {
        Set<Character> set = new LinkedHashSet<>();
        for (char c : my_string.toCharArray()) {
            set.add(c);
        }
        return set.stream().map(String::valueOf).reduce("", String::concat);
    }
}
