function maxNumberOfBalloons(text: string): number {
    // Create an array to count occurrences of each letter (a-z)
    const letterCount = new Array(26).fill(0);
  
    // Count the frequency of each character in the input text
    for (const character of text) {
        // Convert character to index (0-25) by subtracting ASCII value of 'a'
        const index = character.charCodeAt(0) - 97;
        letterCount[index]++;
    }
  
    // Calculate maximum number of "balloon" words that can be formed
    // The word "balloon" contains: b(1), a(1), l(2), o(2), n(1)
    // Index mapping: a=0, b=1, l=11, n=13, o=14
    const countA = letterCount[0];  // 'a' appears once in "balloon"
    const countB = letterCount[1];  // 'b' appears once in "balloon"
    const countL = letterCount[11] >> 1;  // 'l' appears twice, so divide by 2 using right shift
    const countO = letterCount[14] >> 1;  // 'o' appears twice, so divide by 2 using right shift
    const countN = letterCount[13];  // 'n' appears once in "balloon"
  
    // Return the minimum count as it determines the bottleneck
    return Math.min(countA, countB, countL, countO, countN);
}