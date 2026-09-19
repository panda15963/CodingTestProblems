class Solution {
    public boolean isValidSerialization(String preorder) {
        // Use a list as a stack to validate the serialization
        List<String> stack = new ArrayList<>();
      
        // Split the preorder string by comma and process each node
        for (String node : preorder.split(",")) {
            // Add current node to the stack
            stack.add(node);
          
            // Keep reducing valid subtrees to a single "#"
            // Pattern: non-null node followed by two "#" represents a complete subtree
            while (stack.size() >= 3 && 
                   stack.get(stack.size() - 1).equals("#") &&     // Right child is null
                   stack.get(stack.size() - 2).equals("#") &&     // Left child is null  
                   !stack.get(stack.size() - 3).equals("#")) {    // Parent is not null
              
                // Remove the complete subtree (parent and two null children)
                stack.remove(stack.size() - 1);  // Remove right null child
                stack.remove(stack.size() - 1);  // Remove left null child
                stack.remove(stack.size() - 1);  // Remove parent node
              
                // Replace the subtree with a single "#" (null marker)
                stack.add("#");
            }
        }
      
        // Valid serialization should reduce to exactly one "#"
        return stack.size() == 1 && stack.get(0).equals("#");
    }
}
