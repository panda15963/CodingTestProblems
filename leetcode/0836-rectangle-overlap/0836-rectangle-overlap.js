/**
 * Determines if two rectangles overlap.
 * @param {number[]} rec1 - [x1, y1, x2, y2]
 * @param {number[]} rec2 - [x3, y3, x4, y4]
 * @returns {boolean} true if rectangles overlap, false otherwise
 */
function isRectangleOverlap(rec1, rec2) {
    // First rectangle coordinates
    const [firstRectX1, firstRectY1, firstRectX2, firstRectY2] = rec1;

    // Second rectangle coordinates
    const [secondRectX1, secondRectY1, secondRectX2, secondRectY2] = rec2;

    // Check if the rectangles do NOT overlap
    return !(
        secondRectY1 >= firstRectY2 ||
        secondRectY2 <= firstRectY1 ||
        secondRectX1 >= firstRectX2 ||
        secondRectX2 <= firstRectX1
    );
}