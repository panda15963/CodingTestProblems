class Solution {
    public String mapWordWeights(String[] words, int[] weights) {
        StringBuilder result = new StringBuilder();
        
        for (String word : words) {
            long totalWeight = 0;
            
            // Calculate the total weight of characters in the word
            for (int i = 0; i < word.length(); i++) {
                char ch = word.charAt(i);
                totalWeight += weights[ch - 'a'];
            }
            
            // Apply modulo 26 to fit inside alphabet range
            int modValue = (int) (totalWeight % 26);
            
            // Reverse alphabetical mapping: 0 -> 'z', 1 -> 'y', ..., 25 -> 'a'
            char mappedChar = (char) ('z' - modValue);
            
            result.append(mappedChar);
        }
        
        return result.toString();
    }
}
