class Solution {
    public int[][] reconstructQueue(int[][] people) {
        // Sort people array by height in descending order
        // If heights are equal, sort by k value in ascending order
        // This ensures taller people are placed first, and among same height, 
        // those with smaller k values are placed first
        Arrays.sort(people, (person1, person2) -> {
            if (person1[0] == person2[0]) {
                // Same height: sort by k value (ascending)
                return person1[1] - person2[1];
            } else {
                // Different heights: sort by height (descending)
                return person2[0] - person1[0];
            }
        });
      
        // Initialize result list to store the reconstructed queue
        List<int[]> resultQueue = new ArrayList<>(people.length);
      
        // Insert each person at their k-th position
        // Since we process from tallest to shortest, when we insert a person,
        // all people already in the queue are taller or equal height,
        // so the k value directly indicates the insertion position
        for (int[] person : people) {
            int insertPosition = person[1];  // k value represents the position
            resultQueue.add(insertPosition, person);
        }
      
        // Convert the list back to a 2D array and return
        return resultQueue.toArray(new int[resultQueue.size()][]);
    }
}
