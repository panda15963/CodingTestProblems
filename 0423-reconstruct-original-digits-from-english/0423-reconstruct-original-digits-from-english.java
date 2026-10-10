class Solution {
    public String originalDigits(String s) {
        // Count frequency of each character in the input string
        int[] charFrequency = new int[26];
        for (char c : s.toCharArray()) {
            charFrequency[c - 'a']++;
        }
      
        // Array to store count of each digit (0-9)
        int[] digitCount = new int[10];
      
        // First pass: Count digits with unique characters
        // 'z' only appears in "zero"
        digitCount[0] = charFrequency['z' - 'a'];
        // 'w' only appears in "two"
        digitCount[2] = charFrequency['w' - 'a'];
        // 'u' only appears in "four"
        digitCount[4] = charFrequency['u' - 'a'];
        // 'x' only appears in "six"
        digitCount[6] = charFrequency['x' - 'a'];
        // 'g' only appears in "eight"
        digitCount[8] = charFrequency['g' - 'a'];
      
        // Second pass: Count digits after removing counts from first pass
        // 'h' appears in "three" and "eight"
        digitCount[3] = charFrequency['h' - 'a'] - digitCount[8];
        // 'f' appears in "five" and "four"
        digitCount[5] = charFrequency['f' - 'a'] - digitCount[4];
        // 's' appears in "seven" and "six"
        digitCount[7] = charFrequency['s' - 'a'] - digitCount[6];
      
        // Third pass: Count remaining digits
        // 'o' appears in "one", "zero", "two", and "four"
        digitCount[1] = charFrequency['o' - 'a'] - digitCount[0] - digitCount[2] - digitCount[4];
        // 'i' appears in "nine", "five", "six", and "eight"
        digitCount[9] = charFrequency['i' - 'a'] - digitCount[5] - digitCount[6] - digitCount[8];
      
        // Build the result string with digits in ascending order
        StringBuilder result = new StringBuilder();
        for (int digit = 0; digit < 10; digit++) {
            // Append each digit the number of times it appears
            for (int count = 0; count < digitCount[digit]; count++) {
                result.append(digit);
            }
        }
      
        return result.toString();
    }
}
