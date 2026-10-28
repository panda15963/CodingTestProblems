/**
 * Finds the minimum number of steps to spell out a key string by rotating a ring
 * @param ring - The ring string that can be rotated clockwise or anticlockwise
 * @param key - The target string to spell out
 * @returns The minimum number of steps (rotations + button presses) needed
 */
function findRotateSteps(ring: string, key: string): number {
    const keyLength: number = key.length;
    const ringLength: number = ring.length;
  
    // Store all positions for each character in the ring
    // positions[i] contains all indices where character (i + 'a') appears in the ring
    const positions: number[][] = Array.from({ length: 26 }, () => []);
  
    // Populate the positions array with indices for each character
    for (let i = 0; i < ringLength; ++i) {
        const charIndex: number = ring.charCodeAt(i) - 'a'.charCodeAt(0);
        positions[charIndex].push(i);
    }

    // Dynamic programming table
    // dp[i][j] represents minimum steps to spell key[0...i] with ring position j
    const dp: number[][] = Array.from(
        { length: keyLength }, 
        () => Array(ringLength).fill(1 << 30) // Initialize with large value
    );
  
    // Base case: calculate steps for the first character of key
    // Starting from position 0, we can rotate clockwise or anticlockwise
    const firstCharPositions = positions[key.charCodeAt(0) - 'a'.charCodeAt(0)];
    for (const targetPosition of firstCharPositions) {
        // Minimum distance is either clockwise or anticlockwise rotation
        const clockwiseDistance: number = targetPosition;
        const anticlockwiseDistance: number = ringLength - targetPosition;
        dp[0][targetPosition] = Math.min(clockwiseDistance, anticlockwiseDistance) + 1; // +1 for button press
    }

    // Fill the DP table for remaining characters
    for (let i = 1; i < keyLength; ++i) {
        const currentCharPositions = positions[key.charCodeAt(i) - 'a'.charCodeAt(0)];
        const previousCharPositions = positions[key.charCodeAt(i - 1) - 'a'.charCodeAt(0)];
      
        // For each position where current character appears
        for (const currentPosition of currentCharPositions) {
            // Check all possible previous positions
            for (const previousPosition of previousCharPositions) {
                // Calculate minimum rotation distance between positions
                const directDistance: number = Math.abs(currentPosition - previousPosition);
                const aroundDistance: number = ringLength - directDistance;
                const minRotation: number = Math.min(directDistance, aroundDistance);
              
                // Update DP value: previous cost + rotation cost + button press
                dp[i][currentPosition] = Math.min(
                    dp[i][currentPosition],
                    dp[i - 1][previousPosition] + minRotation + 1
                );
            }
        }
    }

    // Find the minimum cost among all possible final positions
    let minSteps: number = 1 << 30; // Initialize with large value
    const lastCharPositions = positions[key.charCodeAt(keyLength - 1) - 'a'.charCodeAt(0)];
    for (const finalPosition of lastCharPositions) {
        minSteps = Math.min(minSteps, dp[keyLength - 1][finalPosition]);
    }
  
    return minSteps;
}
