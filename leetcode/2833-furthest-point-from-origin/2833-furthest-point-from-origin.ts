/**
 * Calculates the furthest distance from origin after executing moves
 * @param moves - String containing 'L' (left), 'R' (right), and '_' (wildcard) moves
 * @returns The maximum possible distance from origin
 */
function furthestDistanceFromOrigin(moves: string): number {
    // Helper function to count occurrences of a specific character in the moves string
    const countCharacter = (character: string): number => {
        return moves.split('').filter((move: string) => move === character).length;
    };
  
    // Count the number of left moves
    const leftCount: number = countCharacter('L');
  
    // Count the number of right moves
    const rightCount: number = countCharacter('R');
  
    // Count the number of wildcard moves (can be either left or right)
    const wildcardCount: number = countCharacter('_');
  
    // The furthest distance is achieved by using all wildcards in the same direction
    // as the majority move direction, resulting in |L - R| + wildcards
    return Math.abs(leftCount - rightCount) + wildcardCount;
}