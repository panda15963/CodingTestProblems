class Solution {
    public int maxNumberOfBalloons(String text) {
        // Create frequency array for all 26 lowercase letters
        int[] charFrequency = new int[26];
      
        // Count frequency of each character in the input text
        for (int i = 0; i < text.length(); i++) {
            charFrequency[text.charAt(i) - 'a']++;
        }
      
        // The word "balloon" contains 2 'l's and 2 'o's
        // Divide their counts by 2 to get the actual number of times they can be used
        charFrequency['l' - 'a'] /= 2;
        charFrequency['o' - 'a'] /= 2;
      
        // Initialize result with a large value
        int maxBalloons = Integer.MAX_VALUE;
      
        // Check the minimum frequency among all required characters
        // "balon" contains unique characters from "balloon" (b, a, l, o, n)
        for (char c : "balon".toCharArray()) {
            maxBalloons = Math.min(maxBalloons, charFrequency[c - 'a']);
        }
      
        return maxBalloons;
    }
}