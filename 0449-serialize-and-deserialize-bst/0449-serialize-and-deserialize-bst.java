/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Codec {
    // Index pointer for deserialization traversal
    private int currentIndex;
  
    // List to store serialized node values
    private List<String> nodeValues;
  
    // Maximum value constant for boundary checking
    private static final int INFINITY = 1 << 30;

    /**
     * Encodes a binary search tree to a single string.
     * Uses preorder traversal to serialize the tree.
     * 
     * @param root The root of the BST to serialize
     * @return A string representation of the BST
     */
    public String serialize(TreeNode root) {
        nodeValues = new ArrayList<>();
        serializeHelper(root);
        return String.join(" ", nodeValues);
    }

    /**
     * Decodes the encoded string back to a binary search tree.
     * Uses BST property with min/max boundaries to reconstruct the tree.
     * 
     * @param data The serialized string representation of the BST
     * @return The root of the reconstructed BST
     */
    public TreeNode deserialize(String data) {
        // Handle empty tree case
        if (data == null || data.isEmpty()) {
            return null;
        }
      
        // Initialize for deserialization
        currentIndex = 0;
        nodeValues = Arrays.asList(data.split(" "));
      
        // Reconstruct tree with full range boundaries
        return deserializeHelper(-INFINITY, INFINITY);
    }

    /**
     * Helper method for serialization using preorder traversal.
     * Visits root, then left subtree, then right subtree.
     * 
     * @param root Current node being serialized
     */
    private void serializeHelper(TreeNode root) {
        if (root == null) {
            return;
        }
      
        // Add current node value to the list
        nodeValues.add(String.valueOf(root.val));
      
        // Recursively serialize left and right subtrees
        serializeHelper(root.left);
        serializeHelper(root.right);
    }

    /**
     * Helper method for deserialization using BST properties.
     * Reconstructs the tree by checking if values fall within valid BST boundaries.
     * 
     * @param minValue Minimum valid value for current subtree
     * @param maxValue Maximum valid value for current subtree
     * @return Root of the reconstructed subtree
     */
    private TreeNode deserializeHelper(int minValue, int maxValue) {
        // Check if we've processed all values
        if (currentIndex == nodeValues.size()) {
            return null;
        }
      
        // Parse the current value
        int currentValue = Integer.parseInt(nodeValues.get(currentIndex));
      
        // Check if current value violates BST property
        if (currentValue < minValue || currentValue > maxValue) {
            return null;
        }
      
        // Create new node with current value
        TreeNode root = new TreeNode(currentValue);
        currentIndex++;
      
        // Recursively build left subtree (values less than current)
        root.left = deserializeHelper(minValue, currentValue);
      
        // Recursively build right subtree (values greater than current)
        root.right = deserializeHelper(currentValue, maxValue);
      
        return root;
    }
}

// Your Codec object will be instantiated and called as such:
// Codec ser = new Codec();
// Codec deser = new Codec();
// String tree = ser.serialize(root);
// TreeNode ans = deser.deserialize(tree);
// return ans;
