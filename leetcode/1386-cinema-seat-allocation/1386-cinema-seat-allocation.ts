/**
 * Calculates the maximum number of 4-person families that can be seated in a cinema
 * @param n - Number of rows in the cinema
 * @param reservedSeats - Array of [row, seat] pairs indicating reserved seats
 * @returns Maximum number of 4-person families that can be accommodated
 */
function maxNumberOfFamilies(n: number, reservedSeats: number[][]): number {
    // Map to store reserved seats for each row as a bitmask
    const reservedSeatsByRow: Map<number, number> = new Map();
  
    // Convert reserved seats to bitmask representation for each row
    // Bit position represents seat number (from right, seat 10 is bit 0, seat 1 is bit 9)
    for (const [row, seat] of reservedSeats) {
        const currentMask = reservedSeatsByRow.get(row) ?? 0;
        const seatBit = 1 << (10 - seat);
        reservedSeatsByRow.set(row, currentMask | seatBit);
    }
  
    // Start with maximum possible families for unreserved rows
    // Each completely empty row can fit 2 families
    let totalFamilies = (n - reservedSeatsByRow.size) * 2;
  
    // Define masks for three possible 4-seat family positions
    const leftGroupMask = 0b0111100000;   // Seats 2-5 (bits for seats 2,3,4,5)
    const rightGroupMask = 0b0000011110;  // Seats 6-9 (bits for seats 6,7,8,9)
    const middleGroupMask = 0b0001111000; // Seats 4-7 (bits for seats 4,5,6,7)
    const familyPositionMasks = [leftGroupMask, rightGroupMask, middleGroupMask];
  
    // Check each row with reserved seats
    for (let [row, reservedMask] of reservedSeatsByRow) {
        // Try to place families in available positions
        for (const positionMask of familyPositionMasks) {
            // Check if all seats in this position are available
            if ((reservedMask & positionMask) === 0) {
                // Mark these seats as occupied to avoid double counting
                reservedMask |= positionMask;
                totalFamilies++;
            }
        }
    }
  
    return totalFamilies;
}
