class Solution {
    /**
     * Reverses every k characters for every 2k characters in the string.
     * For every 2k characters, reverse the first k characters.
     * If there are fewer than k characters left, reverse all of them.
     * 
     * @param s the input string to be processed
     * @param k the number of characters to reverse in each segment
     * @return the modified string with selective reversals
     */
    public String reverseStr(String s, int k) {
        // Convert string to character array for in-place modification
        char[] charArray = s.toCharArray();
        int length = charArray.length;
      
        // Process the string in chunks of 2k characters
        for (int startIndex = 0; startIndex < length; startIndex += k * 2) {
            // Define the range to reverse: first k characters of each 2k block
            int left = startIndex;
            // Right boundary is either k-1 positions from start or end of string (whichever is smaller)
            int right = Math.min(startIndex + k - 1, length - 1);
          
            // Perform two-pointer reversal for the current segment
            while (left < right) {
                // Swap characters at left and right positions
                char temp = charArray[left];
                charArray[left] = charArray[right];
                charArray[right] = temp;
              
                // Move pointers towards center
                left++;
                right--;
            }
        }
      
        // Convert character array back to string and return
        return new String(charArray);
    }
}
