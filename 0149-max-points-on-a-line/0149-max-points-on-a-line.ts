function maxPoints(points: number[][]): number {
    const numPoints = points.length;
    let maxPointsOnLine = 1; // At least one point always exists
  
    // Try each point as the first point of a potential line
    for (let i = 0; i < numPoints; i++) {
        const x1 = points[i][0];
        const y1 = points[i][1];
      
        // Try each subsequent point as the second point to form a line
        for (let j = i + 1; j < numPoints; j++) {
            const x2 = points[j][0];
            const y2 = points[j][1];
          
            // Start with 2 points (i and j) on the current line
            let pointsOnCurrentLine = 2;
          
            // Check all remaining points to see if they're collinear
            for (let k = j + 1; k < numPoints; k++) {
                const x3 = points[k][0];
                const y3 = points[k][1];
              
                // Check collinearity using cross product
                // Points are collinear if (y2-y1)/(x2-x1) == (y3-y1)/(x3-x1)
                // To avoid division, we cross-multiply:
                // (y2-y1)*(x3-x1) == (y3-y1)*(x2-x1)
                const crossProduct1 = (y2 - y1) * (x3 - x1);
                const crossProduct2 = (y3 - y1) * (x2 - x1);
              
                // If cross products are equal, point k is on the same line
                if (crossProduct1 === crossProduct2) {
                    pointsOnCurrentLine++;
                }
            }
          
            // Update the maximum number of points found on any line
            maxPointsOnLine = Math.max(maxPointsOnLine, pointsOnCurrentLine);
        }
    }
  
    return maxPointsOnLine;
}
