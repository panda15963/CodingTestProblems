/**
 * Determines if two rectangles overlap
 * @param rec1 - First rectangle represented as [x1, y1, x2, y2] where (x1, y1) is bottom-left and (x2, y2) is top-right
 * @param rec2 - Second rectangle represented as [x3, y3, x4, y4] where (x3, y3) is bottom-left and (x4, y4) is top-right
 * @returns true if rectangles overlap, false otherwise
 */
function isRectangleOverlap(rec1: number[], rec2: number[]): boolean {
    // Destructure coordinates from first rectangle
    const [firstRectX1, firstRectY1, firstRectX2, firstRectY2] = rec1;
  
    // Destructure coordinates from second rectangle
    const [secondRectX1, secondRectY1, secondRectX2, secondRectY2] = rec2;
  
    // Check for non-overlapping conditions:
    // - Second rectangle is completely above first rectangle (secondRectY1 >= firstRectY2)
    // - Second rectangle is completely below first rectangle (secondRectY2 <= firstRectY1)
    // - Second rectangle is completely to the right of first rectangle (secondRectX1 >= firstRectX2)
    // - Second rectangle is completely to the left of first rectangle (secondRectX2 <= firstRectX1)
    // If none of these conditions are true, rectangles must overlap
    return !(secondRectY1 >= firstRectY2 || 
             secondRectY2 <= firstRectY1 || 
             secondRectX1 >= firstRectX2 || 
             secondRectX2 <= firstRectX1);
}
