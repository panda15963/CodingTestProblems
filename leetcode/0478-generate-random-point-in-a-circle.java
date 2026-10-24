import java.util.Random;

class Solution {
    private double radius;
    private double xCenter;
    private double yCenter;
    private Random random;
  
    /**
     * Initialize the circle with given radius and center coordinates.
     * 
     * @param radius The radius of the circle
     * @param x_center The x-coordinate of the circle's center
     * @param y_center The y-coordinate of the circle's center
     */
    public Solution(double radius, double x_center, double y_center) {
        this.radius = radius;
        this.xCenter = x_center;
        this.yCenter = y_center;
        this.random = new Random();
    }
  
    /**
     * Generate a random point uniformly distributed within the circle.
     * 
     * @return An array containing [x, y] coordinates of the random point
     */
    public double[] randPoint() {
        // Generate random radius using square root for uniform distribution
        // sqrt is used to ensure uniform distribution across the circle area
        // Without sqrt, points would be more concentrated near the center
        double randomRadius = Math.sqrt(random.nextDouble() * radius * radius);
      
        // Generate random angle in radians (0 to 2π)
        double randomAngle = random.nextDouble() * 2 * Math.PI;
      
        // Convert polar coordinates to Cartesian coordinates
        // x = center_x + r * cos(θ)
        double x = xCenter + randomRadius * Math.cos(randomAngle);
        // y = center_y + r * sin(θ)
        double y = yCenter + randomRadius * Math.sin(randomAngle);
      
        return new double[]{x, y};
    }
}
