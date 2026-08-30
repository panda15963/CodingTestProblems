class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Create adjacency list to represent the course dependency graph
        // graph[i] contains all courses that depend on course i
        List<Integer>[] graph = new List[numCourses];
        Arrays.setAll(graph, index -> new ArrayList<>());
      
        // Track the in-degree (number of prerequisites) for each course
        int[] inDegree = new int[numCourses];
      
        // Build the graph and calculate in-degrees
        // For prerequisite [a, b]: course a depends on course b
        // So we add edge from b -> a
        for (int[] prerequisite : prerequisites) {
            int course = prerequisite[0];
            int prerequisiteCourse = prerequisite[1];
            graph[prerequisiteCourse].add(course);
            inDegree[course]++;
        }
      
        // Queue to store courses with no prerequisites (in-degree = 0)
        Deque<Integer> queue = new ArrayDeque<>();
      
        // Add all courses with no prerequisites to the queue
        for (int course = 0; course < numCourses; course++) {
            if (inDegree[course] == 0) {
                queue.offer(course);
            }
        }
      
        // Process courses using topological sort (Kahn's algorithm)
        while (!queue.isEmpty()) {
            // Take a course with no remaining prerequisites
            int currentCourse = queue.poll();
            // Decrement the count of remaining courses to process
            numCourses--;
          
            // For each course that depends on the current course
            for (int dependentCourse : graph[currentCourse]) {
                // Reduce its in-degree since we've completed a prerequisite
                inDegree[dependentCourse]--;
                // If all prerequisites are met, add to queue
                if (inDegree[dependentCourse] == 0) {
                    queue.offer(dependentCourse);
                }
            }
        }
      
        // If all courses are processed (numCourses = 0), no cycle exists
        return numCourses == 0;
    }
}
