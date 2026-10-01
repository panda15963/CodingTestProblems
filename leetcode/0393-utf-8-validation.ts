/**
 * Validates if a sequence of integers represents a valid UTF-8 encoding
 * @param data - Array of integers representing bytes (0-255)
 * @returns true if the data represents valid UTF-8 encoding, false otherwise
 */
function validUtf8(data: number[]): boolean {
    // Counter for remaining continuation bytes expected
    let remainingBytes: number = 0;
  
    for (const byte of data) {
        if (remainingBytes > 0) {
            // Check if current byte is a valid continuation byte (10xxxxxx)
            if (byte >> 6 !== 0b10) {
                return false;
            }
            remainingBytes--;
        } else {
            // Determine the type of UTF-8 character by checking leading bits
            if (byte >> 7 === 0) {
                // 1-byte character (0xxxxxxx)
                remainingBytes = 0;
            } else if (byte >> 5 === 0b110) {
                // 2-byte character (110xxxxx)
                remainingBytes = 1;
            } else if (byte >> 4 === 0b1110) {
                // 3-byte character (1110xxxx)
                remainingBytes = 2;
            } else if (byte >> 3 === 0b11110) {
                // 4-byte character (11110xxx)
                remainingBytes = 3;
            } else {
                // Invalid UTF-8 start byte
                return false;
            }
        }
    }
  
    // All bytes should be consumed (no incomplete multi-byte sequence)
    return remainingBytes === 0;
}
