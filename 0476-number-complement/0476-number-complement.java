class Solution {
    public int findComplement(int num) {
        // Calculate the number of bits needed to represent the number
        // by subtracting the number of leading zeros from 32
        int bitLength = 32 - Integer.numberOfLeadingZeros(num);
      
        // Create a mask with all 1s for the length of the number's bits
        // For example: if num = 5 (101 in binary), we need a mask of 111 (7 in decimal)
        // (1 << bitLength) gives us 1000, then subtract 1 to get 0111
        int mask = (1 << bitLength) - 1;
      
        // XOR the number with the mask to flip all bits
        // This gives us the complement where only the bits in the number's range are flipped
        return num ^ mask;
    }
}
