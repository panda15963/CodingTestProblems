var findKthNumber = function(n, k) {
    function countNumbersInSubtree(currentPrefix) {
        let nextPrefix = currentPrefix + 1;
        let count = 0;

        while (currentPrefix <= n) {
            count += Math.min(
                n - currentPrefix + 1,
                nextPrefix - currentPrefix
            );

            currentPrefix *= 10;
            nextPrefix *= 10;
        }

        return count;
    }

    let currentNumber = 1;
    k--;

    while (k > 0) {
        const subtreeCount = countNumbersInSubtree(currentNumber);

        if (k >= subtreeCount) {
            k -= subtreeCount;
            currentNumber++;
        } else {
            k--;
            currentNumber *= 10;
        }
    }

    return currentNumber;
};