public class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        Set<String> seen = new HashSet<>();
        Set<String> res = new HashSet<>();

        for (int l = 0; l < s.length() - 9; l++) {
            String cur = s.substring(l, l + 10);
            if (seen.contains(cur)) {
                res.add(cur);
            }
            seen.add(cur);
        }
        return new ArrayList<>(res);
    }
}