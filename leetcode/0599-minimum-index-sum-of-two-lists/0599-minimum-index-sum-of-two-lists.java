class Solution {
    public String[] findRestaurant(String[] list1, String[] list2) {
        // Create a map to store restaurants from list2 with their indices
        Map<String, Integer> restaurantIndexMap = new HashMap<>();
      
        // Populate the map with restaurants from list2 and their positions
        for (int i = 0; i < list2.length; i++) {
            restaurantIndexMap.put(list2[i], i);
        }
      
        // List to store restaurants with minimum index sum
        List<String> result = new ArrayList<>();
      
        // Initialize minimum index sum to a large value (2^30)
        int minIndexSum = 1 << 30;
      
        // Iterate through list1 to find common restaurants
        for (int i = 0; i < list1.length; i++) {
            // Check if current restaurant exists in list2
            if (restaurantIndexMap.containsKey(list1[i])) {
                // Get the index of this restaurant in list2
                int list2Index = restaurantIndexMap.get(list1[i]);
              
                // Calculate the sum of indices
                int currentIndexSum = i + list2Index;
              
                // If we found a smaller index sum, update minimum and reset result
                if (currentIndexSum < minIndexSum) {
                    minIndexSum = currentIndexSum;
                    result.clear();
                    result.add(list1[i]);
                } 
                // If index sum equals current minimum, add to result
                else if (currentIndexSum == minIndexSum) {
                    result.add(list1[i]);
                }
            }
        }
      
        // Convert list to array and return
        return result.toArray(new String[0]);
    }
}
