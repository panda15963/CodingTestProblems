/**
 * Determines if the current player can win the Nim game
 * 
 * In the Nim game with the rule of removing 1-3 stones per turn,
 * the player who takes the last stone wins.
 * 
 * Key insight: If there are 4 stones, the current player will lose
 * because no matter how many they take (1-3), the opponent can take
 * the remaining stones. This pattern repeats for all multiples of 4.
 * 
 * @param n - The initial number of stones in the heap
 * @returns true if the current player can win with optimal play, false otherwise
 */
function canWinNim(n: number): boolean {
    // Player loses if and only if the number of stones is divisible by 4
    return n % 4 !== 0;
}
