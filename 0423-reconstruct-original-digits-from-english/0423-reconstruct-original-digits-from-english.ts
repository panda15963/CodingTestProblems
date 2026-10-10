function originalDigits(s: string): string {
    // Count frequency of each character in the input string
    const charFrequency: number[] = new Array(26).fill(0);
    for (const c of s) {
        charFrequency[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
  
    // Array to store count of each digit (0-9)
    const digitCount: number[] = new Array(10).fill(0);
  
    // First pass: Count digits with unique characters
    // 'z' only appears in "zero" (0)
    digitCount[0] = charFrequency['z'.charCodeAt(0) - 'a'.charCodeAt(0)];
    // 'w' only appears in "two" (2)
    digitCount[2] = charFrequency['w'.charCodeAt(0) - 'a'.charCodeAt(0)];
    // 'u' only appears in "four" (4)
    digitCount[4] = charFrequency['u'.charCodeAt(0) - 'a'.charCodeAt(0)];
    // 'x' only appears in "six" (6)
    digitCount[6] = charFrequency['x'.charCodeAt(0) - 'a'.charCodeAt(0)];
    // 'g' only appears in "eight" (8)
    digitCount[8] = charFrequency['g'.charCodeAt(0) - 'a'.charCodeAt(0)];
  
    // Second pass: Count digits that can be determined after removing first pass digits
    // 'h' appears in "three" (3) and "eight" (8)
    digitCount[3] = charFrequency['h'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[8];
    // 'f' appears in "five" (5) and "four" (4)
    digitCount[5] = charFrequency['f'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[4];
    // 's' appears in "seven" (7) and "six" (6)
    digitCount[7] = charFrequency['s'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[6];
  
    // Third pass: Count remaining digits
    // 'o' appears in "one" (1), "zero" (0), "two" (2), and "four" (4)
    digitCount[1] = charFrequency['o'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[0] - digitCount[2] - digitCount[4];
    // 'i' appears in "nine" (9), "five" (5), "six" (6), and "eight" (8)
    digitCount[9] = charFrequency['i'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[5] - digitCount[6] - digitCount[8];
  
    // Build the result string with digits in ascending order
    let result: string = '';
    for (let digit = 0; digit < 10; digit++) {
        for (let count = 0; count < digitCount[digit]; count++) {
            result += String(digit);
        }
    }
  
    return result;
}
