/**
 * Calculates the number of bulbs that remain on after n rounds of toggling.
 * 
 * In this problem, bulb i is toggled in round j if j divides i evenly.
 * A bulb ends up ON if it's toggled an odd number of times.
 * This happens only when the bulb number is a perfect square (since perfect squares
 * have an odd number of divisors).
 * 
 * The answer is the count of perfect squares from 1 to n, which equals floor(sqrt(n)).
 * 
 * @param n - The number of bulbs and rounds
 * @returns The number of bulbs that are on after n rounds
 */
function bulbSwitch(n: number): number {
    // Calculate the number of perfect squares from 1 to n
    return Math.floor(Math.sqrt(n));
}
