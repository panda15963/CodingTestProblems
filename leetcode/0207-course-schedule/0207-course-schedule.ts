/**
 * Determines if all courses can be completed given the prerequisites.
 * Uses topological sorting with Kahn's algorithm to detect cycles in the directed graph.
 * 
 * @param numCourses - Total number of courses labeled from 0 to numCourses-1
 * @param prerequisites - Array of prerequisite pairs where [a, b] means course a requires course b
 * @returns true if all courses can be finished, false if there's a circular dependency
 */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // Build adjacency list graph where graph[i] contains all courses that depend on course i
    const graph: number[][] = Array.from({ length: numCourses }, () => []);
  
    // Track the in-degree (number of prerequisites) for each course
    const inDegree: number[] = Array(numCourses).fill(0);
  
    // Build the graph and calculate in-degrees
    for (const [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);  // Add edge from prerequisite to course
        inDegree[course]++;                // Increment in-degree for the dependent course
    }
  
    // Initialize queue with all courses that have no prerequisites (in-degree = 0)
    const queue: number[] = [];
    for (let courseId = 0; courseId < numCourses; courseId++) {
        if (inDegree[courseId] === 0) {
            queue.push(courseId);
        }
    }
  
    // Process courses in topological order
    for (const currentCourse of queue) {
        numCourses--;  // Decrement count of remaining courses to process
      
        // For each course that depends on the current course
        for (const dependentCourse of graph[currentCourse]) {
            // Decrement in-degree and add to queue if all prerequisites are met
            if (--inDegree[dependentCourse] === 0) {
                queue.push(dependentCourse);
            }
        }
    }
  
    // If all courses were processed (numCourses = 0), there's no cycle
    return numCourses === 0;
}
