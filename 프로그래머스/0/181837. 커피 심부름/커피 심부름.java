class Solution {
    public int solution(String[] order) {
        int sum = 0;
        for (String o : order) {
            if (o.contains("americano") || o.contains("anything")) {
                sum += 4500;
            } else {
                sum += 5000;
            }
        }
        return sum;
    }
}
