/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * public interface NestedInteger {
 *
 *     // @return true if this NestedInteger holds a single integer, rather than a nested list.
 *     public boolean isInteger();
 *
 *     // @return the single integer that this NestedInteger holds, if it holds a single integer
 *     // Return null if this NestedInteger holds a nested list
 *     public Integer getInteger();
 *
 *     // @return the nested list that this NestedInteger holds, if it holds a nested list
 *     // Return empty list if this NestedInteger holds a single integer
 *     public List<NestedInteger> getList();
 * }
 */

/**
 * Iterator for flattening nested lists of integers.
 * This class implements the Iterator interface to provide sequential access
 * to all integers in a nested list structure.
 */
public class NestedIterator implements Iterator<Integer> {
    // List to store all flattened integers from the nested structure
    private List<Integer> flattenedList;
  
    // Current index position in the flattened list
    private int currentIndex;

    /**
     * Constructor that initializes the iterator with a nested list.
     * Flattens the entire nested structure during initialization.
     * 
     * @param nestedList the nested list structure to iterate over
     */
    public NestedIterator(List<NestedInteger> nestedList) {
        this.flattenedList = new ArrayList<>();
        this.currentIndex = -1;
      
        // Flatten the nested list structure using depth-first search
        flatten(nestedList);
    }

    /**
     * Returns the next integer in the iteration.
     * 
     * @return the next integer element
     */
    @Override
    public Integer next() {
        // Increment index and return the element at that position
        currentIndex++;
        return flattenedList.get(currentIndex);
    }

    /**
     * Checks if there are more integers to iterate over.
     * 
     * @return true if there are more elements, false otherwise
     */
    @Override
    public boolean hasNext() {
        // Check if the next index is within bounds
        return currentIndex + 1 < flattenedList.size();
    }

    /**
     * Recursively flattens a nested list structure using depth-first search.
     * Traverses through each element, adding integers directly to the flattened list
     * and recursively processing nested lists.
     * 
     * @param nestedList the nested list to flatten
     */
    private void flatten(List<NestedInteger> nestedList) {
        for (NestedInteger element : nestedList) {
            if (element.isInteger()) {
                // If element is an integer, add it to the flattened list
                flattenedList.add(element.getInteger());
            } else {
                // If element is a nested list, recursively flatten it
                flatten(element.getList());
            }
        }
    }
}

/**
 * Your NestedIterator object will be instantiated and called as such:
 * NestedIterator i = new NestedIterator(nestedList);
 * while (i.hasNext()) v[f()] = i.next();
 */
