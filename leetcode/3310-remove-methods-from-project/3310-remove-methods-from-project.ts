/**
 * Finds remaining methods after removing suspicious methods
 * @param n - Total number of methods
 * @param k - The initial suspicious method
 * @param invocations - Array of method invocation relationships [a, b] means method a invokes method b
 * @returns Array of method indices that are not suspicious
 */
function remainingMethods(n: number, k: number, invocations: number[][]): number[] {
    // Track which methods are suspicious
    const isSuspicious: boolean[] = Array(n).fill(false);
  
    // Track visited nodes during second DFS traversal
    const isVisited: boolean[] = Array(n).fill(false);
  
    // Bidirectional adjacency list for all invocations
    const bidirectionalGraph: number[][] = Array.from({ length: n }, () => []);
  
    // Directed adjacency list following invocation direction
    const directedGraph: number[][] = Array.from({ length: n }, () => []);

    // Build both graph representations
    for (const [invoker, invoked] of invocations) {
        bidirectionalGraph[invoker].push(invoked);
        bidirectionalGraph[invoked].push(invoker);
        directedGraph[invoker].push(invoked);
    }

    /**
     * First DFS: Mark all methods reachable from the initial suspicious method
     * Following the directed invocation graph
     * @param methodIndex - Current method being processed
     */
    const markSuspiciousMethods = (methodIndex: number): void => {
        isSuspicious[methodIndex] = true;
      
        // Traverse all methods invoked by current method
        for (const invokedMethod of directedGraph[methodIndex]) {
            if (!isSuspicious[invokedMethod]) {
                markSuspiciousMethods(invokedMethod);
            }
        }
    };

    /**
     * Second DFS: Clear suspicious flag for methods connected to non-suspicious ones
     * Using bidirectional connections to find mixed components
     * @param methodIndex - Current method being processed
     */
    const clearConnectedMethods = (methodIndex: number): void => {
        isVisited[methodIndex] = true;
      
        // Check all bidirectionally connected methods
        for (const connectedMethod of bidirectionalGraph[methodIndex]) {
            if (!isVisited[connectedMethod]) {
                isSuspicious[connectedMethod] = false;
                clearConnectedMethods(connectedMethod);
            }
        }
    };

    // Step 1: Mark all methods reachable from the initial suspicious method
    markSuspiciousMethods(k);

    // Step 2: For each non-suspicious method, clear all connected methods
    // This handles cases where suspicious and non-suspicious methods are interconnected
    for (let methodIndex = 0; methodIndex < n; methodIndex++) {
        if (!isSuspicious[methodIndex] && !isVisited[methodIndex]) {
            clearConnectedMethods(methodIndex);
        }
    }

    // Return indices of all non-suspicious methods
    return Array.from({ length: n }, (_, index) => index)
        .filter(index => !isSuspicious[index]);
}