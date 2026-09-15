var findMinHeightTrees = function(n, edges) {
    if (n === 1) {
        return [0];
    }

    const adjacencyList = Array.from({ length: n }, () => []);
    const nodeDegrees = Array(n).fill(0);

    for (const [nodeA, nodeB] of edges) {
        adjacencyList[nodeA].push(nodeB);
        adjacencyList[nodeB].push(nodeA);

        nodeDegrees[nodeA]++;
        nodeDegrees[nodeB]++;
    }

    let leafQueue = [];

    for (let nodeIndex = 0; nodeIndex < n; nodeIndex++) {
        if (nodeDegrees[nodeIndex] === 1) {
            leafQueue.push(nodeIndex);
        }
    }

    let result = [];

    while (leafQueue.length > 0) {
        result = [];
        const nextLayerLeaves = [];

        for (const currentLeaf of leafQueue) {
            result.push(currentLeaf);

            for (const neighbor of adjacencyList[currentLeaf]) {
                nodeDegrees[neighbor]--;

                if (nodeDegrees[neighbor] === 1) {
                    nextLayerLeaves.push(neighbor);
                }
            }
        }

        leafQueue = nextLayerLeaves;
    }

    return result;
};