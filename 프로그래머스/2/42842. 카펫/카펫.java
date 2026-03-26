class Solution {
    public int[] solution(int brown, int yellow) {
        int total = brown + yellow;
        for (int w = 1; w <= total; w++) {
            if (total % w == 0) {
                int h = total / w;
                if (2 * (w + h - 2) == brown) {
                    return new int[]{Math.max(w, h), Math.min(w, h)};
                }
            }
        }
        return new int[]{};
    }
}
