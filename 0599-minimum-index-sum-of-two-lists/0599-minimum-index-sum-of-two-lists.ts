/**
 * Finds common restaurants between two lists with minimum index sum
 * @param list1 - First array of restaurant names
 * @param list2 - Second array of restaurant names
 * @returns Array of restaurant names with minimum index sum
 */
function findRestaurant(list1: string[], list2: string[]): string[] {
    // Create a map to store restaurant names from list2 with their indices
    const restaurantIndexMap = new Map<string, number>(
        list2.map((restaurant, index) => [restaurant, index])
    );
  
    // Track the minimum index sum found so far
    let minimumIndexSum = Infinity;
  
    // Store restaurants with minimum index sum
    const result: string[] = [];
  
    // Iterate through list1 to find common restaurants
    list1.forEach((restaurant, indexInList1) => {
        // Check if current restaurant exists in list2
        if (restaurantIndexMap.has(restaurant)) {
            // Get the index of restaurant in list2
            const indexInList2 = restaurantIndexMap.get(restaurant)!;
          
            // Calculate the sum of indices
            const currentIndexSum = indexInList1 + indexInList2;
          
            // If we found a smaller index sum, reset result and add current restaurant
            if (currentIndexSum < minimumIndexSum) {
                minimumIndexSum = currentIndexSum;
                result.length = 0;  // Clear the array
                result.push(restaurant);
            } 
            // If index sum equals minimum, add to result
            else if (currentIndexSum === minimumIndexSum) {
                result.push(restaurant);
            }
        }
    });
  
    return result;
}
