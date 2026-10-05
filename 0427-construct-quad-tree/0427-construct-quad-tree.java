/*
// Definition for a QuadTree node.
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;

    public Node() {
        this.val = false;
        this.isLeaf = false;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf, Node topLeft, Node topRight, Node bottomLeft, Node bottomRight) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
};
*/

class Solution {
    /**
     * Constructs a QuadTree from a 2D grid
     * @param grid The input 2D grid containing 0s and 1s
     * @return The root node of the constructed QuadTree
     */
    public Node construct(int[][] grid) {
        // Start recursive construction from the entire grid
        return buildQuadTree(0, 0, grid.length - 1, grid[0].length - 1, grid);
    }

    /**
     * Recursively builds a QuadTree for a given region of the grid
     * @param rowStart Starting row index (inclusive)
     * @param colStart Starting column index (inclusive)
     * @param rowEnd Ending row index (inclusive)
     * @param colEnd Ending column index (inclusive)
     * @param grid The original 2D grid
     * @return The root node of the QuadTree for this region
     */
    private Node buildQuadTree(int rowStart, int colStart, int rowEnd, int colEnd, int[][] grid) {
        // Check if all values in current region are the same
        int hasZero = 0;
        int hasOne = 0;
      
        // Scan through the current region to check for 0s and 1s
        for (int row = rowStart; row <= rowEnd; row++) {
            for (int col = colStart; col <= colEnd; col++) {
                if (grid[row][col] == 0) {
                    hasZero = 1;
                } else {
                    hasOne = 1;
                }
            }
        }
      
        // If region contains only 0s or only 1s, it's a leaf node
        boolean isLeaf = (hasZero + hasOne) == 1;
        // Leaf value is true if region contains only 1s
        boolean value = isLeaf && (hasOne == 1);
      
        // Create the current node
        Node currentNode = new Node(value, isLeaf);
      
        // If it's a leaf node, no need to divide further
        if (isLeaf) {
            return currentNode;
        }
      
        // Calculate midpoints for dividing the region into quadrants
        int midRow = (rowStart + rowEnd) / 2;
        int midCol = (colStart + colEnd) / 2;
      
        // Recursively build four quadrants
        currentNode.topLeft = buildQuadTree(rowStart, colStart, midRow, midCol, grid);
        currentNode.topRight = buildQuadTree(rowStart, midCol + 1, midRow, colEnd, grid);
        currentNode.bottomLeft = buildQuadTree(midRow + 1, colStart, rowEnd, midCol, grid);
        currentNode.bottomRight = buildQuadTree(midRow + 1, midCol + 1, rowEnd, colEnd, grid);
      
        return currentNode;
    }
}
