/**
 * Calculates the minimum initial effort required to complete all tasks
 * @param tasks - Array of tasks where each task is [actualEffort, minimumEffort]
 * @returns The minimum initial effort needed
 */
function minimumEffort(tasks) {
    // Sort tasks by the difference between actual effort and minimum effort (ascending)
    tasks.sort((taskA, taskB) => {
        const gapA = taskA[0] - taskA[1];
        const gapB = taskB[0] - taskB[1];
        return gapA - gapB;
    });
  
    let totalEffortNeeded = 0;
    let currentEffort = 0;
  
    for (const task of tasks) {
        const actualEffortRequired = task[0];
        const minimumEffortRequired = task[1];
      
        if (currentEffort < minimumEffortRequired) {
            const effortToAdd = minimumEffortRequired - currentEffort;
            totalEffortNeeded += effortToAdd;
            currentEffort = minimumEffortRequired;
        }
      
        currentEffort -= actualEffortRequired;
    }
  
    return totalEffortNeeded;
}