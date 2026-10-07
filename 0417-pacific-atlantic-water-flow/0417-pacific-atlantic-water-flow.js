var pacificAtlantic = function(heights) {
    const result = [];

    for (let i = 0; i < heights.length; i++) {
        for (let j = 0; j < heights[0].length; j++) {
            const flow = {
                flowToPacificOcean: false,
                flowToAtlanticOcean: false
            };

            dfs(
                flow,
                heights,
                Infinity,
                i,
                j
            );

            if (
                flow.flowToAtlanticOcean &&
                flow.flowToPacificOcean
            ) {
                result.push([i, j]);
            }
        }
    }

    return result;
};

function dfs(flow, heights, prev, i, j) {
    if (i === -1 || j === -1) {
        flow.flowToPacificOcean = true;
        return;
    }

    if (
        i === heights.length ||
        j === heights[0].length
    ) {
        flow.flowToAtlanticOcean = true;
        return;
    }

    if (
        heights[i][j] === -1 ||
        heights[i][j] > prev ||
        (
            flow.flowToAtlanticOcean &&
            flow.flowToPacificOcean
        )
    ) {
        return;
    }

    const currentHeight = heights[i][j];

    heights[i][j] = -1;

    dfs(flow, heights, currentHeight, i + 1, j);
    dfs(flow, heights, currentHeight, i - 1, j);
    dfs(flow, heights, currentHeight, i, j + 1);
    dfs(flow, heights, currentHeight, i, j - 1);

    heights[i][j] = currentHeight;
}