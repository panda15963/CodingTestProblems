function isRectangleCover(rectangles: number[][]): boolean {
    // Calculate total area and find the bounding rectangle
    let totalArea = 0;
    let minX = rectangles[0][0];
    let minY = rectangles[0][1];
    let maxX = rectangles[0][2];
    let maxY = rectangles[0][3];
  
    // Map to count occurrences of each corner point
    // Key: "x,y" coordinate string, Value: count of occurrences
    const cornerCount = new Map<string, number>();
  
    // Helper function to create a point key
    const makePointKey = (x: number, y: number): string => {
        return `${x},${y}`;
    };
  
    // Process each rectangle
    for (const rect of rectangles) {
        // Add area of current rectangle
        totalArea += (rect[2] - rect[0]) * (rect[3] - rect[1]);
      
        // Update bounding rectangle coordinates
        minX = Math.min(minX, rect[0]);
        minY = Math.min(minY, rect[1]);
        maxX = Math.max(maxX, rect[2]);
        maxY = Math.max(maxY, rect[3]);
      
        // Count occurrences of each corner of the current rectangle
        // Bottom-left corner
        const bottomLeft = makePointKey(rect[0], rect[1]);
        cornerCount.set(bottomLeft, (cornerCount.get(bottomLeft) || 0) + 1);
      
        // Top-left corner
        const topLeft = makePointKey(rect[0], rect[3]);
        cornerCount.set(topLeft, (cornerCount.get(topLeft) || 0) + 1);
      
        // Top-right corner
        const topRight = makePointKey(rect[2], rect[3]);
        cornerCount.set(topRight, (cornerCount.get(topRight) || 0) + 1);
      
        // Bottom-right corner
        const bottomRight = makePointKey(rect[2], rect[1]);
        cornerCount.set(bottomRight, (cornerCount.get(bottomRight) || 0) + 1);
    }
  
    // Calculate expected area of the bounding rectangle
    const expectedArea = (maxX - minX) * (maxY - minY);
  
    // Check if total area matches and the four corners of bounding rectangle appear exactly once
    const boundingCornerBL = makePointKey(minX, minY);
    const boundingCornerTL = makePointKey(minX, maxY);
    const boundingCornerTR = makePointKey(maxX, maxY);
    const boundingCornerBR = makePointKey(maxX, minY);
  
    if (totalArea !== expectedArea || 
        cornerCount.get(boundingCornerBL) !== 1 || 
        cornerCount.get(boundingCornerTL) !== 1 || 
        cornerCount.get(boundingCornerTR) !== 1 || 
        cornerCount.get(boundingCornerBR) !== 1) {
        return false;
    }
  
    // Remove the four corners of the bounding rectangle
    cornerCount.delete(boundingCornerBL);
    cornerCount.delete(boundingCornerTL);
    cornerCount.delete(boundingCornerTR);
    cornerCount.delete(boundingCornerBR);
  
    // Check if all remaining corner points appear exactly 2 or 4 times
    // 2 times: shared edge between two rectangles
    // 4 times: intersection point of four rectangles
    for (const [point, count] of cornerCount) {
        if (count !== 2 && count !== 4) {
            return false;
        }
    }
  
    return true;
}
