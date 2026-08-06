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
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        return pathSum(root, targetSum, 0, new LinkedList<Integer>(), new LinkedList<List<Integer>>());
    }
    
    public List<List<Integer>> pathSum(TreeNode root, int targetSum, int sum, List<Integer> target, List<List<Integer>> list) {
        if(root == null) return list;
        target.add(root.val);
        sum += root.val;
        if(root.left == null && root.right == null) {
            if(sum == targetSum) {
                List<Integer> temp = new LinkedList<Integer>();
                for (Integer val : target) {
                    temp.add(val);
                }
                list.add(temp);
            }
        }
        if(root.left != null) pathSum(root.left, targetSum, sum, target, list);
        if(root.right != null) pathSum(root.right, targetSum, sum, target, list);
        target.remove(target.size() - 1);
        return list;
    }
}