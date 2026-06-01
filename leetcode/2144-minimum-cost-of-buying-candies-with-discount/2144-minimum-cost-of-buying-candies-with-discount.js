function minimumCost(cost) {
    // Sort the costs in ascending order
    cost.sort((a, b) => a - b);

    let totalCost = 0;

    for (let i = cost.length - 1; i >= 0; i -= 3) {
        totalCost += cost[i];

        if (i > 0) {
            totalCost += cost[i - 1];
        }
    }

    return totalCost;
}