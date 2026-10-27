/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    // Maximum frequency found so far
    private int maxFrequency;
  
    // Current count of consecutive equal values
    private int currentCount;
  
    // Previous node visited in the in-order traversal
    private TreeNode previousNode;
  
    // List to store the mode values
    private List<Integer> modeList;

    /**
     * Finds all mode values in a binary search tree.
     * Mode is the value that appears most frequently in the tree.
     * 
     * @param root The root of the binary search tree
     * @return An array containing all mode values
     */
    public int[] findMode(TreeNode root) {
        // Initialize the result list
        modeList = new ArrayList<>();
      
        // Perform in-order traversal to find modes
        inOrderTraversal(root);
      
        // Convert list to array for return value
        int[] result = new int[modeList.size()];
        for (int i = 0; i < modeList.size(); i++) {
            result[i] = modeList.get(i);
        }
      
        return result;
    }

    /**
     * Performs in-order traversal of the BST to find mode values.
     * In-order traversal of BST gives values in sorted order,
     * making it easy to count consecutive equal values.
     * 
     * @param node The current node being processed
     */
    private void inOrderTraversal(TreeNode node) {
        // Base case: if node is null, return
        if (node == null) {
            return;
        }
      
        // Process left subtree first
        inOrderTraversal(node.left);
      
        // Process current node
        // Update count: increment if same as previous, otherwise reset to 1
        currentCount = (previousNode != null && previousNode.val == node.val) 
                      ? currentCount + 1 
                      : 1;
      
        // Check if current count exceeds maximum frequency
        if (currentCount > maxFrequency) {
            // New maximum found, clear list and add current value
            modeList = new ArrayList<>(Arrays.asList(node.val));
            maxFrequency = currentCount;
        } else if (currentCount == maxFrequency) {
            // Current value has same frequency as maximum, add to list
            modeList.add(node.val);
        }
      
        // Update previous node for next iteration
        previousNode = node;
      
        // Process right subtree
        inOrderTraversal(node.right);
    }
}
