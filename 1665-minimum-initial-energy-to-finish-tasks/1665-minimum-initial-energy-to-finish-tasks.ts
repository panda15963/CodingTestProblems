/**
 * Calculates the minimum initial effort required to complete all tasks
 * @param tasks - Array of tasks where each task is [actualEffort, minimumEffort]
 * @returns The minimum initial effort needed
 */
function minimumEffort(tasks: number[][]): number {
    // Sort tasks by the difference between actual effort and minimum effort (ascending)
    // This ensures we tackle tasks with smaller effort gaps first
    tasks.sort((taskA: number[], taskB: number[]) => {
        const gapA: number = taskA[0] - taskA[1];
        const gapB: number = taskB[0] - taskB[1];
        return gapA - gapB;
    });
  
    // Track the total effort we need to add
    let totalEffortNeeded: number = 0;
    // Track our current available effort
    let currentEffort: number = 0;
  
    // Process each task in sorted order
    for (const task of tasks) {
        const [actualEffortRequired, minimumEffortRequired]: [number, number] = [task[0], task[1]];
      
        // If current effort is less than minimum required, add the difference
        if (currentEffort < minimumEffortRequired) {
            const effortToAdd: number = minimumEffortRequired - currentEffort;
            totalEffortNeeded += effortToAdd;
            currentEffort = minimumEffortRequired;
        }
      
        // Consume the actual effort for this task
        currentEffort -= actualEffortRequired;
    }
  
    return totalEffortNeeded;
}