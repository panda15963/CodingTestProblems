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
    // HashMap to store the frequency of each subtree sum
    private Map<Integer, Integer> sumFrequencyMap = new HashMap<>();
  
    // Variable to track the maximum frequency among all subtree sums
    private int maxFrequency;

    /**
     * Finds all subtree sums that appear with the highest frequency
     * @param root The root of the binary tree
     * @return Array containing all subtree sums with maximum frequency
     */
    public int[] findFrequentTreeSum(TreeNode root) {
        // Perform DFS to calculate all subtree sums and their frequencies
        calculateSubtreeSum(root);
      
        // List to store all sums that have the maximum frequency
        List<Integer> mostFrequentSums = new ArrayList<>();
      
        // Iterate through the frequency map to find sums with maximum frequency
        for (Map.Entry<Integer, Integer> entry : sumFrequencyMap.entrySet()) {
            if (entry.getValue() == maxFrequency) {
                mostFrequentSums.add(entry.getKey());
            }
        }
      
        // Convert the list to an integer array and return
        return mostFrequentSums.stream().mapToInt(Integer::intValue).toArray();
    }

    /**
     * Recursively calculates the sum of each subtree and updates frequency map
     * @param node The current node being processed
     * @return The sum of the subtree rooted at the current node
     */
    private int calculateSubtreeSum(TreeNode node) {
        // Base case: if node is null, return 0
        if (node == null) {
            return 0;
        }
      
        // Calculate the sum of current subtree:
        // current node value + sum of left subtree + sum of right subtree
        int currentSubtreeSum = node.val + calculateSubtreeSum(node.left) + calculateSubtreeSum(node.right);
      
        // Update the frequency of this sum in the map and get the new frequency
        // merge() adds 1 to existing frequency or sets it to 1 if key doesn't exist
        int updatedFrequency = sumFrequencyMap.merge(currentSubtreeSum, 1, Integer::sum);
      
        // Update the maximum frequency if current frequency is higher
        maxFrequency = Math.max(maxFrequency, updatedFrequency);
      
        // Return the sum of current subtree for parent's calculation
        return currentSubtreeSum;
    }
}
