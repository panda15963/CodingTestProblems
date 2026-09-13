/**
 * Determines if the current player can win the Nim game.
 *
 * In the Nim game, a player can remove 1-3 stones per turn.
 * The player who takes the last stone wins.
 *
 * @param {number} n - The initial number of stones
 * @returns {boolean} true if the current player can win,
 *                    false otherwise
 */
function canWinNim(n) {
    // If n is divisible by 4, the current player loses.
    return n % 4 !== 0;
}