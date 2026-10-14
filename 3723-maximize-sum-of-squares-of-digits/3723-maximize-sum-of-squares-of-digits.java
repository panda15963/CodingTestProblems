class Solution {
    public String maxSumOfSquares(int num, int total) {
        if (num * 9 < total) {
            return "";
        }

        int nines = total / 9;
        int rem = total % 9;

        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < nines; i++) {
            sb.append('9');
        }

        if (rem > 0) {
            sb.append(rem);
        }

        while (sb.length() < num) {
            sb.append('0');
        }

        return sb.toString();
    }
}