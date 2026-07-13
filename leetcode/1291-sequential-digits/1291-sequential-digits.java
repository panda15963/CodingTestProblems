public class Solution {
    public List<Integer> sequentialDigits(int low, int high) {
        List<Integer> res = new ArrayList<>();
        int lowDigit = String.valueOf(low).length();
        int highDigit = String.valueOf(high).length();

        for (int digits = lowDigit; digits <= highDigit; digits++) {
            for (int start = 1; start < 10; start++) {
                if (start + digits > 10) {
                    break;
                }
                int num = start;
                int prev = start;
                for (int i = 1; i < digits; i++) {
                    num = num * 10 + (++prev);
                }
                if (num >= low && num <= high) {
                    res.add(num);
                }
            }
        }
        return res;
    }
}