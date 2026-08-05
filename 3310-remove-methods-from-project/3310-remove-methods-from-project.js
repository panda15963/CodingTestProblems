/**
 * Finds remaining methods after removing suspicious methods.
 *
 * @param {number} n - Total number of methods
 * @param {number} k - Initial suspicious method
 * @param {number[][]} invocations - Invocation relationships
 * @return {number[]} Remaining non-suspicious methods
 */
function remainingMethods(n, k, invocations) {
    // Track suspicious methods
    const isSuspicious = Array(n).fill(false);

    // Track visited methods during second DFS
    const isVisited = Array(n).fill(false);

    // Bidirectional graph
    const bidirectionalGraph = Array.from({ length: n }, () => []);

    // Directed graph
    const directedGraph = Array.from({ length: n }, () => []);

    // Build graphs
    for (const [invoker, invoked] of invocations) {
        bidirectionalGraph[invoker].push(invoked);
        bidirectionalGraph[invoked].push(invoker);
        directedGraph[invoker].push(invoked);
    }

    /**
     * Mark all suspicious methods reachable from k.
     * @param {number} methodIndex
     */
    function markSuspiciousMethods(methodIndex) {
        isSuspicious[methodIndex] = true;

        for (const invokedMethod of directedGraph[methodIndex]) {
            if (!isSuspicious[invokedMethod]) {
                markSuspiciousMethods(invokedMethod);
            }
        }
    }

    /**
     * Clear suspicious marks for methods connected to non-suspicious ones.
     * @param {number} methodIndex
     */
    function clearConnectedMethods(methodIndex) {
        isVisited[methodIndex] = true;

        for (const connectedMethod of bidirectionalGraph[methodIndex]) {
            if (!isVisited[connectedMethod]) {
                isSuspicious[connectedMethod] = false;
                clearConnectedMethods(connectedMethod);
            }
        }
    }

    // Step 1: Mark suspicious methods
    markSuspiciousMethods(k);

    // Step 2: Clear connected components containing non-suspicious methods
    for (let methodIndex = 0; methodIndex < n; methodIndex++) {
        if (!isSuspicious[methodIndex] && !isVisited[methodIndex]) {
            clearConnectedMethods(methodIndex);
        }
    }

    // Collect remaining methods
    const result = [];

    for (let i = 0; i < n; i++) {
        if (!isSuspicious[i]) {
            result.push(i);
        }
    }

    return result;
}