/**
 * Checks if a circle overlaps with an axis-aligned rectangle
 * @param radius - The radius of the circle
 * @param xCenter - The x-coordinate of the circle's center
 * @param yCenter - The y-coordinate of the circle's center
 * @param x1 - The x-coordinate of the bottom-left corner of the rectangle
 * @param y1 - The y-coordinate of the bottom-left corner of the rectangle
 * @param x2 - The x-coordinate of the top-right corner of the rectangle
 * @param y2 - The y-coordinate of the top-right corner of the rectangle
 * @returns true if the circle and rectangle overlap, false otherwise
 */
function checkOverlap(
    radius: number,
    xCenter: number,
    yCenter: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
): boolean {
    /**
     * Calculates the minimum distance from a point to a line segment
     * @param segmentStart - Start coordinate of the line segment
     * @param segmentEnd - End coordinate of the line segment
     * @param point - The point coordinate to measure distance from
     * @returns The minimum distance from the point to the segment
     */
    const getMinimumDistanceToSegment = (
        segmentStart: number,
        segmentEnd: number,
        point: number
    ): number => {
        // If the point is within the segment bounds, distance is 0
        if (segmentStart <= point && point <= segmentEnd) {
            return 0;
        }
        // If point is before segment start, return distance to start
        // If point is after segment end, return distance to end
        return point < segmentStart ? segmentStart - point : point - segmentEnd;
    };
  
    // Calculate minimum horizontal distance from circle center to rectangle
    const horizontalDistance: number = getMinimumDistanceToSegment(x1, x2, xCenter);
  
    // Calculate minimum vertical distance from circle center to rectangle
    const verticalDistance: number = getMinimumDistanceToSegment(y1, y2, yCenter);
  
    // Check if the squared distance is within the squared radius
    // Using squared values to avoid computing square root
    return horizontalDistance * horizontalDistance + verticalDistance * verticalDistance <= radius * radius;
}
