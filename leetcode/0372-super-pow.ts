/**
 * Calculates a^b mod 1337 where b is represented as an array of digits
 * @param a - The base number
 * @param b - The exponent represented as an array of digits (e.g., 123 = [1,2,3])
 * @returns The result of a^b mod 1337
 */
function superPow(a: number, b: number[]): number {
    let result = 1;
    const MOD = 1337;
  
    /**
     * Fast exponentiation function to calculate (base^exponent) % MOD
     * Uses binary exponentiation for efficiency
     * @param base - The base number
     * @param exponent - The exponent
     * @returns (base^exponent) % MOD
     */
    const quickPower = (base: number, exponent: number): number => {
        let powerResult = 1;
      
        // Binary exponentiation: process exponent bit by bit
        while (exponent > 0) {
            // If current bit is 1, multiply result by current base
            if (exponent & 1) {
                powerResult = Number((BigInt(powerResult) * BigInt(base)) % BigInt(MOD));
            }
            // Square the base for next bit position
            base = Number((BigInt(base) * BigInt(base)) % BigInt(MOD));
            // Shift exponent right by 1 bit
            exponent >>= 1;
        }
      
        return powerResult;
    };
  
    // Process digits from least significant to most significant
    // Uses the property: a^(10*d1 + d0) = (a^10)^d1 * a^d0
    for (let i = b.length - 1; i >= 0; i--) {
        // Multiply result by a^(current digit)
        result = Number((BigInt(result) * BigInt(quickPower(a, b[i]))) % BigInt(MOD));
        // Update base for next digit position (a becomes a^10)
        a = quickPower(a, 10);
    }
  
    return result;
}
