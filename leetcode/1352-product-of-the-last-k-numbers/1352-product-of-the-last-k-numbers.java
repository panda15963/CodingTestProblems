class ProductOfNumbers {
    // List to store cumulative products
    // Each element at index i stores the product of all elements from index 0 to i
    private List<Integer> cumulativeProducts;

    /**
     * Constructor initializes the list with 1 as the first element
     * This serves as a base for calculating products
     */
    public ProductOfNumbers() {
        cumulativeProducts = new ArrayList<>();
        cumulativeProducts.add(1);
    }

    /**
     * Adds a number to the data stream
     * @param num The number to be added
     */
    public void add(int num) {
        // If num is 0, reset the list since any product involving 0 will be 0
        if (num == 0) {
            cumulativeProducts.clear();
            cumulativeProducts.add(1);
            return;
        }
      
        // Add the cumulative product by multiplying the last cumulative product with the new number
        int lastProduct = cumulativeProducts.get(cumulativeProducts.size() - 1);
        cumulativeProducts.add(lastProduct * num);
    }

    /**
     * Returns the product of the last k numbers in the current list
     * @param k The number of recent elements to calculate the product for
     * @return The product of the last k numbers, or 0 if there was a 0 in the last k numbers
     */
    public int getProduct(int k) {
        int currentSize = cumulativeProducts.size();
      
        // If we don't have k elements (excluding the initial 1), it means there was a 0 
        // in the last k numbers, so return 0
        if (currentSize <= k) {
            return 0;
        }
      
        // Calculate product of last k elements by dividing the cumulative product at the end
        // by the cumulative product just before the k elements
        return cumulativeProducts.get(currentSize - 1) / cumulativeProducts.get(currentSize - k - 1);
    }
}

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * ProductOfNumbers obj = new ProductOfNumbers();
 * obj.add(num);
 * int param_2 = obj.getProduct(k);
 */
