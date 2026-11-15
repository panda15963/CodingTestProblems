class Solution {
    /**
     * Determines if four points form a valid square.
     * A valid square has all four sides of equal length and all four angles are right angles.
     * 
     * @param p1 First point coordinates [x, y]
     * @param p2 Second point coordinates [x, y]
     * @param p3 Third point coordinates [x, y]
     * @param p4 Fourth point coordinates [x, y]
     * @return true if the four points form a valid square, false otherwise
     */
    public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {
        // Check if all possible combinations of three points form right triangles
        // For a valid square, any three vertices should form a right isosceles triangle
        return checkRightIsoscelesTriangle(p1, p2, p3) && 
               checkRightIsoscelesTriangle(p1, p3, p4) && 
               checkRightIsoscelesTriangle(p1, p2, p4) && 
               checkRightIsoscelesTriangle(p2, p3, p4);
    }

    /**
     * Checks if three points form a right isosceles triangle.
     * Uses the Pythagorean theorem: for a right triangle, the sum of squares 
     * of two shorter sides equals the square of the longest side.
     * 
     * @param pointA First point coordinates [x, y]
     * @param pointB Second point coordinates [x, y]
     * @param pointC Third point coordinates [x, y]
     * @return true if the three points form a right isosceles triangle, false otherwise
     */
    private boolean checkRightIsoscelesTriangle(int[] pointA, int[] pointB, int[] pointC) {
        // Extract coordinates for better readability
        int xA = pointA[0], yA = pointA[1];
        int xB = pointB[0], yB = pointB[1];
        int xC = pointC[0], yC = pointC[1];
      
        // Calculate squared distances between each pair of points
        // Using squared distances to avoid floating point operations
        int distanceSquaredAB = (xA - xB) * (xA - xB) + (yA - yB) * (yA - yB);
        int distanceSquaredAC = (xA - xC) * (xA - xC) + (yA - yC) * (yA - yC);
        int distanceSquaredBC = (xB - xC) * (xB - xC) + (yB - yC) * (yB - yC);
      
        // Check if the triangle is right isosceles (two equal sides and satisfies Pythagorean theorem)
        // Case 1: AB and AC are equal sides, BC is hypotenuse
        if (distanceSquaredAB == distanceSquaredAC && 
            distanceSquaredAB + distanceSquaredAC == distanceSquaredBC && 
            distanceSquaredAB > 0) {
            return true;
        }
      
        // Case 2: AB and BC are equal sides, AC is hypotenuse
        if (distanceSquaredAB == distanceSquaredBC && 
            distanceSquaredAB + distanceSquaredBC == distanceSquaredAC && 
            distanceSquaredAB > 0) {
            return true;
        }
      
        // Case 3: AC and BC are equal sides, AB is hypotenuse
        if (distanceSquaredAC == distanceSquaredBC && 
            distanceSquaredAC + distanceSquaredBC == distanceSquaredAB && 
            distanceSquaredAC > 0) {
            return true;
        }
      
        // Not a right isosceles triangle
        return false;
    }
}
