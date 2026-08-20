class Solution {
    public String convertToTitle(int columnNumber) {
        int n = columnNumber;
        StringBuilder c = new StringBuilder();

        if (n < 27) {
            return Character.toString((char) (n + 64));
        }

        while (n > 0) {
            if (n % 26 == 0) {
                c.append('Z');
                n = n / 26;
                n--;
            } else {
                c.append((char) (n % 26 + 64));
                n = n / 26;
            }
        }

        return c.reverse().toString();
    }
}