class RandomizedCollection {
    // Map to store value -> set of indices where this value appears in the list
    private Map<Integer, Set<Integer>> valueToIndices;
    // List to store all values (allows duplicates)
    private List<Integer> valuesList;
    // Random number generator for getRandom operation
    private Random random;

    /** Initialize your data structure here. */
    public RandomizedCollection() {
        valueToIndices = new HashMap<>();
        valuesList = new ArrayList<>();
        random = new Random();
    }

    /**
     * Inserts a value to the collection. Returns true if the collection did not already contain
     * the specified element.
     */
    public boolean insert(int val) {
        // Add the current index (size of list) to the set of indices for this value
        // computeIfAbsent creates a new HashSet if the key doesn't exist
        valueToIndices.computeIfAbsent(val, k -> new HashSet<>()).add(valuesList.size());
      
        // Add the value to the end of the list
        valuesList.add(val);
      
        // Return true if this was the first occurrence of the value (set size is 1)
        return valueToIndices.get(val).size() == 1;
    }

    /**
     * Removes a value from the collection. Returns true if the collection contained the specified
     * element.
     */
    public boolean remove(int val) {
        // Check if the value exists in the collection
        if (!valueToIndices.containsKey(val)) {
            return false;
        }
      
        // Get the set of indices for the value to be removed
        Set<Integer> indicesSet = valueToIndices.get(val);
        // Get any index of the value to be removed (using iterator)
        int indexToRemove = indicesSet.iterator().next();
        // Get the index of the last element in the list
        int lastIndex = valuesList.size() - 1;
      
        // Swap the element to be removed with the last element
        // This allows O(1) removal from the list
        valuesList.set(indexToRemove, valuesList.get(lastIndex));
      
        // Remove the index from the set of indices for the value being removed
        indicesSet.remove(indexToRemove);
      
        // Update indices for the value that was swapped from the last position
        Set<Integer> lastValueIndicesSet = valueToIndices.get(valuesList.get(lastIndex));
        // Remove the old last index from the set
        lastValueIndicesSet.remove(lastIndex);
        // If we didn't remove the last element itself, add the new index
        if (indexToRemove < lastIndex) {
            lastValueIndicesSet.add(indexToRemove);
        }
      
        // If no more indices exist for the removed value, remove it from the map
        if (indicesSet.isEmpty()) {
            valueToIndices.remove(val);
        }
      
        // Remove the last element from the list (which is now a duplicate or was swapped)
        valuesList.remove(lastIndex);
      
        return true;
    }

    /** Get a random element from the collection. */
    public int getRandom() {
        int size = valuesList.size();
        // Return -1 if the collection is empty, otherwise return a random element
        return size == 0 ? -1 : valuesList.get(random.nextInt(size));
    }
}

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * RandomizedCollection obj = new RandomizedCollection();
 * boolean param_1 = obj.insert(val);
 * boolean param_2 = obj.remove(val);
 * int param_3 = obj.getRandom();
 */
