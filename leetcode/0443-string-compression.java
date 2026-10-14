class Solution {
    public int compress(char[] chars) {
        // writeIndex: position to write the compressed result
        // arrayLength: total length of the input array
        int writeIndex = 0;
        int arrayLength = chars.length;
      
        // Use two pointers to traverse the array
        // currentIndex: start of current group of same characters
        // nextIndex: points to the next different character
        int currentIndex = 0;
      
        while (currentIndex < arrayLength) {
            // Find the end of current group of identical characters
            int nextIndex = currentIndex + 1;
            while (nextIndex < arrayLength && chars[nextIndex] == chars[currentIndex]) {
                nextIndex++;
            }
          
            // Write the character to the result
            chars[writeIndex++] = chars[currentIndex];
          
            // Calculate the count of identical characters
            int count = nextIndex - currentIndex;
          
            // If count > 1, write the count as string digits
            if (count > 1) {
                String countString = String.valueOf(count);
                for (char digit : countString.toCharArray()) {
                    chars[writeIndex++] = digit;
                }
            }
          
            // Move to the next group of characters
            currentIndex = nextIndex;
        }
      
        // Return the length of the compressed array
        return writeIndex;
    }
}
