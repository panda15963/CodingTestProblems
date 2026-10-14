function compress(chars: string[]): number {
    let writeIndex = 0;  // Index for writing compressed characters
    const arrayLength = chars.length;
  
    // Iterate through the array using two pointers
    let readIndex = 0;
    while (readIndex < arrayLength) {
        let nextIndex = readIndex + 1;
      
        // Find the end of the current group of consecutive characters
        while (nextIndex < arrayLength && chars[nextIndex] === chars[readIndex]) {
            nextIndex++;
        }
      
        // Write the character to the compressed position
        chars[writeIndex++] = chars[readIndex];
      
        // Calculate the size of the current group
        const groupSize = nextIndex - readIndex;
      
        // If the group has more than one character, write the count
        if (groupSize > 1) {
            // Convert the count to string and write each digit
            const countStr = groupSize.toString();
            for (const digit of countStr) {
                chars[writeIndex++] = digit;
            }
        }
      
        // Move to the next group
        readIndex = nextIndex;
    }
  
    // Return the new length of the compressed array
    return writeIndex;
}
