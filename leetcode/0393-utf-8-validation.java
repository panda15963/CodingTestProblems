class Solution {
    /**
     * Validates if a sequence of integers represents a valid UTF-8 encoding.
     * 
     * @param data Array of integers where each integer represents 1 byte of data
     * @return true if the data represents valid UTF-8 encoding, false otherwise
     */
    public boolean validUtf8(int[] data) {
        // Counter to track remaining continuation bytes expected
        int remainingBytes = 0;
      
        // Process each byte in the data array
        for (int currentByte : data) {
            if (remainingBytes > 0) {
                // We're expecting a continuation byte (format: 10xxxxxx)
                // Check if the two most significant bits are '10'
                if (currentByte >> 6 != 0b10) {
                    return false;
                }
                remainingBytes--;
            } else {
                // We're at the start of a new UTF-8 character
                // Determine the type based on the leading bits
              
                if (currentByte >> 7 == 0) {
                    // 1-byte character (0xxxxxxx)
                    remainingBytes = 0;
                } else if (currentByte >> 5 == 0b110) {
                    // 2-byte character (110xxxxx)
                    remainingBytes = 1;
                } else if (currentByte >> 4 == 0b1110) {
                    // 3-byte character (1110xxxx)
                    remainingBytes = 2;
                } else if (currentByte >> 3 == 0b11110) {
                    // 4-byte character (11110xxx)
                    remainingBytes = 3;
                } else {
                    // Invalid UTF-8 start byte
                    return false;
                }
            }
        }
      
        // All bytes processed - valid only if no continuation bytes are pending
        return remainingBytes == 0;
    }
}
