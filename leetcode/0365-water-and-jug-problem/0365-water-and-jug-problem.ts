function canMeasureWater(x: number, y: number, z: number): boolean {
    // Define type for representing state (water in jug1, water in jug2)
    type State = [number, number];
  
    // Stack for DFS traversal of possible states
    const stateStack: State[] = [];
    stateStack.push([0, 0]); // Start with both jugs empty
  
    // Set to track visited states to avoid infinite loops
    // Using string representation as key since TypeScript doesn't have built-in pair hashing
    const visitedStates = new Set<string>();
  
    // Helper function to create unique string key for state
    const getStateKey = (state: State): string => {
        return `${state[0]},${state[1]}`;
    };
  
    // DFS to explore all possible states
    while (stateStack.length > 0) {
        const currentState = stateStack.pop()!;
        const stateKey = getStateKey(currentState);
      
        // Skip if this state has already been visited
        if (visitedStates.has(stateKey)) {
            continue;
        }
      
        // Mark current state as visited
        visitedStates.add(stateKey);
      
        // Extract water amounts in both jugs
        const [waterInJug1, waterInJug2] = currentState;
      
        // Check if we've reached the target amount
        if (waterInJug1 === z || waterInJug2 === z || waterInJug1 + waterInJug2 === z) {
            return true;
        }
      
        // Generate all possible next states from current state
      
        // Operation 1: Fill jug1 completely
        stateStack.push([x, waterInJug2]);
      
        // Operation 2: Fill jug2 completely
        stateStack.push([waterInJug1, y]);
      
        // Operation 3: Empty jug1
        stateStack.push([0, waterInJug2]);
      
        // Operation 4: Empty jug2
        stateStack.push([waterInJug1, 0]);
      
        // Operation 5: Pour from jug1 to jug2
        // Amount to pour = min(water in jug1, space left in jug2)
        const pourAmount1To2 = Math.min(waterInJug1, y - waterInJug2);
        stateStack.push([waterInJug1 - pourAmount1To2, waterInJug2 + pourAmount1To2]);
      
        // Operation 6: Pour from jug2 to jug1
        // Amount to pour = min(water in jug2, space left in jug1)
        const pourAmount2To1 = Math.min(waterInJug2, x - waterInJug1);
        stateStack.push([waterInJug1 + pourAmount2To1, waterInJug2 - pourAmount2To1]);
    }
  
    // No valid state found that gives us exactly z liters
    return false;
}
