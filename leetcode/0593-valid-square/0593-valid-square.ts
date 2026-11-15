function validSquare(p1: number[], p2: number[], p3: number[], p4: number[]): boolean {
    // A valid square requires all four combinations of three points to form
    // right isosceles triangles (two equal sides and a right angle)
    return checkRightIsoscelesTriangle(p1, p2, p3) && 
           checkRightIsoscelesTriangle(p1, p3, p4) && 
           checkRightIsoscelesTriangle(p1, p2, p4) && 
           checkRightIsoscelesTriangle(p2, p3, p4);
}

function checkRightIsoscelesTriangle(pointA: number[], pointB: number[], pointC: number[]): boolean {
    // Extract coordinates for clarity
    const x1 = pointA[0], y1 = pointA[1];
    const x2 = pointB[0], y2 = pointB[1];
    const x3 = pointC[0], y3 = pointC[1];
  
    // Calculate squared distances between all pairs of points
    // Using squared distances to avoid floating point operations
    const distSquaredAB = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    const distSquaredAC = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
    const distSquaredBC = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
  
    // Check if the three points form a right isosceles triangle
    // This requires two sides to be equal (isosceles) and satisfy Pythagorean theorem (right angle)
    // Also ensure the distances are positive (non-zero) to avoid degenerate cases
  
    // Case 1: AB and AC are equal sides, BC is hypotenuse
    if (distSquaredAB === distSquaredAC && distSquaredAB + distSquaredAC === distSquaredBC && distSquaredAB > 0) {
        return true;
    }
  
    // Case 2: AB and BC are equal sides, AC is hypotenuse
    if (distSquaredAB === distSquaredBC && distSquaredAB + distSquaredBC === distSquaredAC && distSquaredAB > 0) {
        return true;
    }
  
    // Case 3: AC and BC are equal sides, AB is hypotenuse
    if (distSquaredAC === distSquaredBC && distSquaredAC + distSquaredBC === distSquaredAB && distSquaredAC > 0) {
        return true;
    }
  
    return false;
}
