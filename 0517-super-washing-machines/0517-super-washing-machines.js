/**
 * Finds the minimum number of moves to balance washing machines.
 * @param {number[]} machines
 * @return {number}
 */
var findMinMoves = function(machines) {
    const machineCount = machines.length;

    const totalDresses = machines.reduce(
        (sum, dresses) => sum + dresses,
        0
    );

    // Check if equal distribution is possible.
    if (totalDresses % machineCount !== 0) {
        return -1;
    }

    const targetDressesPerMachine = totalDresses / machineCount;

    let runningBalance = 0;
    let minimumMoves = 0;

    for (const currentDresses of machines) {
        const excessDresses =
            currentDresses - targetDressesPerMachine;

        runningBalance += excessDresses;

        minimumMoves = Math.max(
            minimumMoves,
            Math.abs(runningBalance),
            excessDresses
        );
    }

    return minimumMoves;
};