class Solution {
    public String getHint(String secret, String guess) {
        // Initialize counters for bulls (exact matches) and cows (wrong position matches)
        int bulls = 0;
        int cows = 0;
      
        // Arrays to count frequency of each digit (0-9) in non-matching positions
        int[] secretDigitCount = new int[10];
        int[] guessDigitCount = new int[10];
      
        // Iterate through both strings simultaneously
        for (int i = 0; i < secret.length(); i++) {
            // Convert characters to integer digits
            int secretDigit = secret.charAt(i) - '0';
            int guessDigit = guess.charAt(i) - '0';
          
            // Check if digits match at the same position (bull)
            if (secretDigit == guessDigit) {
                bulls++;
            } else {
                // If not a bull, count the digits for later cow calculation
                secretDigitCount[secretDigit]++;
                guessDigitCount[guessDigit]++;
            }
        }
      
        // Calculate cows by finding minimum occurrences of each digit in both arrays
        for (int digit = 0; digit < 10; digit++) {
            cows += Math.min(secretDigitCount[digit], guessDigitCount[digit]);
        }
      
        // Format and return the result as "xAyB"
        return String.format("%dA%dB", bulls, cows);
    }
}
