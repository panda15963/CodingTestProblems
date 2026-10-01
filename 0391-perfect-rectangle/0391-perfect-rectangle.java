class Solution {
    public boolean isRectangleCover(int[][] rectangles) {
        // Track total area of all rectangles
        long totalArea = 0;
      
        // Track the boundaries of the overall rectangle
        int minX = rectangles[0][0];
        int minY = rectangles[0][1];
        int maxX = rectangles[0][2];
        int maxY = rectangles[0][3];
      
        // Map to count occurrences of each corner point
        Map<Point, Integer> cornerCount = new HashMap<>();

        // Process each rectangle
        for (int[] rectangle : rectangles) {
            // Calculate and add area of current rectangle
            int width = rectangle[2] - rectangle[0];
            int height = rectangle[3] - rectangle[1];
            totalArea += (long) width * height;

            // Update overall boundaries
            minX = Math.min(minX, rectangle[0]);
            minY = Math.min(minY, rectangle[1]);
            maxX = Math.max(maxX, rectangle[2]);
            maxY = Math.max(maxY, rectangle[3]);

            // Count occurrences of each corner of the current rectangle
            // Bottom-left corner
            cornerCount.merge(new Point(rectangle[0], rectangle[1]), 1, Integer::sum);
            // Top-left corner
            cornerCount.merge(new Point(rectangle[0], rectangle[3]), 1, Integer::sum);
            // Top-right corner
            cornerCount.merge(new Point(rectangle[2], rectangle[3]), 1, Integer::sum);
            // Bottom-right corner
            cornerCount.merge(new Point(rectangle[2], rectangle[1]), 1, Integer::sum);
        }

        // Calculate expected area of the overall rectangle
        long expectedArea = (long) (maxX - minX) * (maxY - minY);
      
        // Check if total area matches and if the four corners of the overall rectangle appear exactly once
        if (totalArea != expectedArea
            || cornerCount.getOrDefault(new Point(minX, minY), 0) != 1
            || cornerCount.getOrDefault(new Point(minX, maxY), 0) != 1
            || cornerCount.getOrDefault(new Point(maxX, maxY), 0) != 1
            || cornerCount.getOrDefault(new Point(maxX, minY), 0) != 1) {
            return false;
        }

        // Remove the four corners of the overall rectangle
        cornerCount.remove(new Point(minX, minY));
        cornerCount.remove(new Point(minX, maxY));
        cornerCount.remove(new Point(maxX, maxY));
        cornerCount.remove(new Point(maxX, minY));

        // All remaining internal corners should appear exactly 2 or 4 times
        // 2 times: corner shared by 2 rectangles along an edge
        // 4 times: corner shared by 4 rectangles at an internal point
        return cornerCount.values().stream().allMatch(count -> count == 2 || count == 4);
    }

    /**
     * Helper class to represent a 2D point
     */
    private static class Point {
        final int x;
        final int y;

        Point(int x, int y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) {
                return true;
            }
            if (obj == null || getClass() != obj.getClass()) {
                return false;
            }
            Point point = (Point) obj;
            return x == point.x && y == point.y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }
}
