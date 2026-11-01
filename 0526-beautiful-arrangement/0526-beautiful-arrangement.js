var countArrangement = function(n) {
    const visited = new Array(n + 1).fill(false);

    const validNumbersForPosition = Array.from(
        { length: n + 1 },
        () => []
    );

    // Precompute valid numbers for each position
    for (let position = 1; position <= n; position++) {
        for (let num = 1; num <= n; num++) {
            if (position % num === 0 || num % position === 0) {
                validNumbersForPosition[position].push(num);
            }
        }
    }

    let totalArrangements = 0;

    const findArrangements = (currentPosition) => {
        // All positions have been filled
        if (currentPosition === n + 1) {
            totalArrangements++;
            return;
        }

        // Try each valid number
        for (const num of validNumbersForPosition[currentPosition]) {
            if (!visited[num]) {
                visited[num] = true;

                findArrangements(currentPosition + 1);

                // Backtracking
                visited[num] = false;
            }
        }
    };

    findArrangements(1);

    return totalArrangements;
};