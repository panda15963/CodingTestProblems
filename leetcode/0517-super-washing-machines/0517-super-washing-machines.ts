/**
 * Finds the minimum number of moves to balance washing machines
 * @param machines - Array where machines[i] represents number of dresses in machine i
 * @returns Minimum number of moves to balance all machines, or -1 if impossible
 */
function findMinMoves(machines: number[]): number {
    const machineCount: number = machines.length;
  
    // Calculate total number of dresses across all machines
    let totalDresses: number = machines.reduce((sum, dresses) => sum + dresses, 0);
  
    // Check if equal distribution is possible
    if (totalDresses % machineCount !== 0) {
        return -1;
    }
  
    // Calculate target number of dresses per machine
    const targetDressesPerMachine: number = Math.floor(totalDresses / machineCount);
  
    // Track the running sum of excess/deficit dresses
    let runningBalance: number = 0;
    let minimumMoves: number = 0;
  
    // Process each machine to find minimum moves needed
    for (let currentDresses of machines) {
        // Calculate excess/deficit for current machine
        const excessDresses: number = currentDresses - targetDressesPerMachine;
      
        // Update running balance (cumulative flow through machines)
        runningBalance += excessDresses;
      
        // The answer is the maximum of:
        // 1. Absolute value of running balance (dresses flowing through boundary)
        // 2. Excess dresses from current machine (if positive, must give away)
        minimumMoves = Math.max(minimumMoves, Math.abs(runningBalance), excessDresses);
    }
  
    return minimumMoves;
}
