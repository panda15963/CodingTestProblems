class Solution {
    /**
     * Determines if the first player can win the Nim game.
     * 
     * In the Nim game with stones, players take turns removing 1-3 stones.
     * The player who removes the last stone wins.
     * 
     * Game theory analysis:
     * - If n = 1, 2, or 3: First player wins by taking all stones
     * - If n = 4: First player loses (any move leaves 1-3 stones for opponent to win)
     * - If n = 5, 6, or 7: First player wins by leaving exactly 4 stones for opponent
     * - Pattern continues: First player loses only when n is divisible by 4
     * 
     * @param n The number of stones in the pile
     * @return true if the first player can win with optimal play, false otherwise
     */
    public boolean canWinNim(int n) {
        // First player can win if and only if n is not divisible by 4
        return n % 4 != 0;
    }
}
