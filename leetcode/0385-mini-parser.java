/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * public interface NestedInteger {
 *     // Constructor initializes an empty nested list.
 *     public NestedInteger();
 *
 *     // Constructor initializes a single integer.
 *     public NestedInteger(int value);
 *
 *     // @return true if this NestedInteger holds a single integer, rather than a nested list.
 *     public boolean isInteger();
 *
 *     // @return the single integer that this NestedInteger holds, if it holds a single integer
 *     // Return null if this NestedInteger holds a nested list
 *     public Integer getInteger();
 *
 *     // Set this NestedInteger to hold a single integer.
 *     public void setInteger(int value);
 *
 *     // Set this NestedInteger to hold a nested list and adds a nested integer to it.
 *     public void add(NestedInteger ni);
 *
 *     // @return the nested list that this NestedInteger holds, if it holds a nested list
 *     // Return empty list if this NestedInteger holds a single integer
 *     public List<NestedInteger> getList();
 * }
 */
class Solution {
    /**
     * Deserializes a string representation into a NestedInteger structure.
     * Examples: "123" -> single integer, "[123,[456,789]]" -> nested list
     * 
     * @param s The string to deserialize
     * @return A NestedInteger object representing the deserialized structure
     */
    public NestedInteger deserialize(String s) {
        // Handle empty string or empty list case
        if ("".equals(s) || "[]".equals(s)) {
            return new NestedInteger();
        }
      
        // If string doesn't start with '[', it's a single integer
        if (s.charAt(0) != '[') {
            return new NestedInteger(Integer.parseInt(s));
        }
      
        // Create a new nested list to hold the result
        NestedInteger result = new NestedInteger();
      
        // Track bracket depth to identify top-level elements
        int bracketDepth = 0;
      
        // Iterate through the string, skipping the first '[' and last ']'
        // startIndex tracks the beginning of current element
        for (int currentIndex = 1, startIndex = 1; currentIndex < s.length(); currentIndex++) {
            // When at depth 0, comma or end bracket indicates element boundary
            if (bracketDepth == 0 && (s.charAt(currentIndex) == ',' || currentIndex == s.length() - 1)) {
                // Recursively deserialize the substring representing current element
                result.add(deserialize(s.substring(startIndex, currentIndex)));
                // Move start pointer past the comma
                startIndex = currentIndex + 1;
            } 
            // Track opening brackets to increase depth
            else if (s.charAt(currentIndex) == '[') {
                bracketDepth++;
            } 
            // Track closing brackets to decrease depth
            else if (s.charAt(currentIndex) == ']') {
                bracketDepth--;
            }
        }
      
        return result;
    }
}
