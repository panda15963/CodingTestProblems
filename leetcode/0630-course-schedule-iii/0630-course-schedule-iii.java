class Solution {
    public int scheduleCourse(int[][] courses) {
        // Sort the courses by their end day
        Arrays.sort(courses, (course1, course2) -> course1[1] - course2[1]);

        // Create a max-heap (priority queue) to keep track of the longest courses taken so far
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((duration1, duration2) -> duration2 - duration1);
      
        int currentTime = 0; // Keep track of the total duration of all courses taken so far
      
        // Iterate through each course
        for (int[] course : courses) {
            // Extract the course duration and the last day the course can be taken
            int duration = course[0], lastDay = course[1];
          
            // Add the current course duration to the heap and increment total time
            maxHeap.offer(duration);
            currentTime += duration;
          
            // If the current time exceeds the end day of the last course, remove the longest course duration
            while (currentTime > lastDay) {
                currentTime -= maxHeap.poll(); // This keeps us within the last day limit
            }
        }
      
        // The size of the heap indicates the maximum number of courses that can be taken
        return maxHeap.size();
    }
}
