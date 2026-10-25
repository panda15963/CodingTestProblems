/**
 * Generates a magical string and counts the number of 1s in the first n elements.
 * The magical string is defined by the Kolakoski sequence where each element
 * describes the run length of consecutive identical numbers.
 * 
 * @param n - The number of elements to consider from the magical string
 * @returns The count of 1s in the first n elements of the magical string
 */
function magicalString(n: number): number {
    // Initialize the magical string with the first three elements
    // The pattern starts with [1, 2, 2]
    const magicalSequence: number[] = [1, 2, 2];
  
    // Build the magical string until we have at least n elements
    // i represents the index that tells us how many times to repeat the next number
    for (let index = 2; magicalSequence.length < n; ++index) {
        // Get the last element in the current sequence
        const previousElement = magicalSequence[magicalSequence.length - 1];
      
        // Calculate the next element to add (alternates between 1 and 2)
        // If previous was 1, next is 2; if previous was 2, next is 1
        const currentElement = 3 - previousElement;
      
        // Add the current element to the sequence
        // The number of times to add is determined by magicalSequence[index]
        for (let count = 0; count < magicalSequence[index]; ++count) {
            magicalSequence.push(currentElement);
        }
    }
  
    // Take only the first n elements and count how many are equal to 1
    return magicalSequence
        .slice(0, n)
        .filter((element: number) => element === 1)
        .length;
}
