function gcdValues(nums, queries) {
    // Find the maximum value in the input array
    const maxValue = Math.max(...nums);

    // Count frequency of each number in the input array
    const frequencyCount = new Array(maxValue + 1).fill(0);
    for (const number of nums) {
        frequencyCount[number]++;
    }

    // Calculate the number of pairs with each possible GCD value
    // gcdPairCount[i] will store the number of pairs with GCD exactly equal to i
    const gcdPairCount = new Array(maxValue + 1).fill(0);

    // Process GCD values from largest to smallest
    for (let gcd = maxValue; gcd >= 1; gcd--) {
        // Count total elements that are multiples of current gcd
        let multiplesCount = 0;

        // Iterate through all multiples of current gcd
        for (let multiple = gcd; multiple <= maxValue; multiple += gcd) {
            multiplesCount += frequencyCount[multiple];

            // Subtract pairs that have GCD as a multiple of current gcd
            // (to get pairs with GCD exactly equal to current gcd)
            gcdPairCount[gcd] -= gcdPairCount[multiple];
        }

        // Add all possible pairs from elements that are multiples of current gcd
        // Formula: C(n, 2) = n * (n - 1) / 2
        gcdPairCount[gcd] += Math.floor(
            (multiplesCount * (multiplesCount - 1)) / 2
        );
    }

    // Convert to cumulative sum for binary search
    // gcdPairCount[i] now represents the number of pairs with GCD <= i
    for (let i = 2; i <= maxValue; i++) {
        gcdPairCount[i] += gcdPairCount[i - 1];
    }

    // Process each query using binary search
    const result = [];

    for (const query of queries) {
        // Find the smallest GCD value where cumulative count > query
        // This gives us the (query + 1)-th smallest GCD in sorted order
        const gcdValue = upperBound(gcdPairCount, query);
        result.push(gcdValue);
    }

    return result;
}

// Helper function to find the first index where array[index] > target
// Uses standard template: feasible = array[mid] > target
function upperBound(array, target) {
    let left = 0;
    let right = array.length - 1;
    let firstTrueIndex = array.length;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (array[mid] > target) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return firstTrueIndex;
}