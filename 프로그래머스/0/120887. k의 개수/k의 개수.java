class Solution {
    public int solution(int i, int j, int k) {
        int count = 0;
        for (int num = i; num <= j; num++) {
            count += Integer.toString(num).length() - Integer.toString(num).replaceAll(Integer.toString(k), "").length();
        }
        return count;
    }
}
