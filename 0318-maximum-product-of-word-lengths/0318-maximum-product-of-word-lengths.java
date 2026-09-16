class Solution {
    public int maxProduct(String[] words) {
        int wordCount = words.length;
        // Array to store bitmask representation of each word
        // Each bit position represents a letter (a=0, b=1, ..., z=25)
        int[] bitmasks = new int[wordCount];
        int maxProduct = 0;
      
        // Process each word
        for (int i = 0; i < wordCount; ++i) {
            // Create bitmask for current word
            // Set bit at position (character - 'a') to 1 if character exists
            for (char character : words[i].toCharArray()) {
                bitmasks[i] |= 1 << (character - 'a');
            }
          
            // Compare current word with all previously processed words
            for (int j = 0; j < i; ++j) {
                // Check if two words share no common letters
                // Bitwise AND of their masks should be 0 if no common letters
                if ((bitmasks[i] & bitmasks[j]) == 0) {
                    // Calculate product of lengths and update maximum
                    int currentProduct = words[i].length() * words[j].length();
                    maxProduct = Math.max(maxProduct, currentProduct);
                }
            }
        }
      
        return maxProduct;
    }
}
