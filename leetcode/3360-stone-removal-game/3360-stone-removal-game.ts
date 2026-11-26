/**
 * Determines if Alice can win the game where players alternately subtract
 * decreasing values (starting from 10) from n until no valid move remains.
 * Alice starts first, and a player loses when they cannot make a valid move.
 * 
 * @param n - The initial number to play with
 * @returns true if Alice wins, false otherwise
 */
function canAliceWin(n: number): boolean {
    // Initialize the current subtraction value and turn counter
    let currentSubtractionValue: number = 10;
    let turnCount: number = 0;
  
    // Continue playing while we can subtract the current value from n
    while (n >= currentSubtractionValue) {
        // Subtract the current value from n
        n -= currentSubtractionValue;
      
        // Decrease the subtraction value for the next turn
        currentSubtractionValue--;
      
        // Increment the turn counter
        turnCount++;
    }
  
    // Alice wins if the total number of turns is odd (she made the last valid move)
    return turnCount % 2 === 1;
}
