class Solution {
    public int maxPoints(int[][] points) {
        int n = points.length;
        int maxPointsOnLine = 1; // At least one point exists
      
        // Iterate through each point as the first point of a potential line
        for (int i = 0; i < n; ++i) {
            int x1 = points[i][0];
            int y1 = points[i][1];
          
            // Iterate through each point after i as the second point to form a line
            for (int j = i + 1; j < n; ++j) {
                int x2 = points[j][0];
                int y2 = points[j][1];
                int pointsOnCurrentLine = 2; // Line through points i and j has at least 2 points
              
                // Check all remaining points to see if they lie on the same line
                for (int k = j + 1; k < n; ++k) {
                    int x3 = points[k][0];
                    int y3 = points[k][1];
                  
                    // Check if point k is collinear with points i and j
                    // Using cross product: if (y2-y1)/(x2-x1) = (y3-y1)/(x3-x1)
                    // Cross multiply to avoid division: (y2-y1)*(x3-x1) = (y3-y1)*(x2-x1)
                    int crossProduct1 = (y2 - y1) * (x3 - x1);
                    int crossProduct2 = (y3 - y1) * (x2 - x1);
                  
                    if (crossProduct1 == crossProduct2) {
                        ++pointsOnCurrentLine;
                    }
                }
              
                // Update the maximum number of points found on a single line
                maxPointsOnLine = Math.max(maxPointsOnLine, pointsOnCurrentLine);
            }
        }
      
        return maxPointsOnLine;
    }
}
