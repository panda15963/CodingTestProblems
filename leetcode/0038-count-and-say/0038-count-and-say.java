class Solution {
    public String countAndSay(int n) {
        if (n == 1) {
            return "1";
        }

        String currentStr = "1";

        // Repeat the transformation n - 1 times
        for (int step = 0; step < n - 1; step++) {
            StringBuilder nextStr = new StringBuilder();
            int count = 1;

            // Count consecutive digits
            for (int i = 0; i < currentStr.length(); i++) {
                if (i + 1 == currentStr.length() ||
                    currentStr.charAt(i) != currentStr.charAt(i + 1)) {

                    nextStr.append(count);
                    nextStr.append(currentStr.charAt(i));
                    count = 1;
                } else {
                    count++;
                }
            }

            currentStr = nextStr.toString();
        }

        return currentStr;
    }
}