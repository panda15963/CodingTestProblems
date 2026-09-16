class Solution {
    /**
     * Calculates the number of bulbs that remain on after n rounds of toggling.
     * 
     * Key insight: Only bulbs at positions that are perfect squares will remain on.
     * This is because perfect squares have an odd number of divisors.
     * 
     * For example:
     * - Bulb 1: toggled in round 1 only (1 divisor) -> ON
     * - Bulb 4: toggled in rounds 1, 2, 4 (3 divisors) -> ON  
     * - Bulb 9: toggled in rounds 1, 3, 9 (3 divisors) -> ON
     * - Bulb 6: toggled in rounds 1, 2, 3, 6 (4 divisors) -> OFF
     * 
     * The number of perfect squares from 1 to n is floor(sqrt(n)).
     * 
     * @param n The total number of bulbs
     * @return The number of bulbs that are on after n rounds
     */
    public int bulbSwitch(int n) {
        // Calculate the square root of n and convert to integer
        // This gives us the count of perfect squares from 1 to n
        return (int) Math.sqrt(n);
    }
}
