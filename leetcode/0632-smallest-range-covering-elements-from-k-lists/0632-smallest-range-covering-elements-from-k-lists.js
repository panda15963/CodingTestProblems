var smallestRange = function(nums) {
    // Calculate total number of elements
    let totalElements = 0;

    for (const list of nums) {
        totalElements += list.length;
    }

    // Create [value, listIndex] pairs
    const elements = new Array(totalElements);
    const numLists = nums.length;

    // Populate elements array
    let index = 0;

    for (let listIdx = 0; listIdx < numLists; listIdx++) {
        for (const value of nums[listIdx]) {
            elements[index++] = [value, listIdx];
        }
    }

    // Sort by value
    elements.sort((a, b) => a[0] - b[0]);

    // Sliding window
    let left = 0;
    const listCount = new Map();

    let result = [-1000000, 1000000];

    // Expand window using right pointer
    for (let right = 0; right < totalElements; right++) {
        const rightValue = elements[right][0];
        const rightListIdx = elements[right][1];

        // Add current list to window
        listCount.set(
            rightListIdx,
            (listCount.get(rightListIdx) || 0) + 1
        );

        // Shrink window while all lists are covered
        while (listCount.size === numLists) {
            const leftValue = elements[left][0];
            const leftListIdx = elements[left][1];

            // Update the smallest range
            const rangeDiff =
                (rightValue - leftValue) -
                (result[1] - result[0]);

            if (
                rangeDiff < 0 ||
                (rangeDiff === 0 && leftValue < result[0])
            ) {
                result[0] = leftValue;
                result[1] = rightValue;
            }

            // Remove leftmost element
            const newCount = listCount.get(leftListIdx) - 1;

            if (newCount === 0) {
                listCount.delete(leftListIdx);
            } else {
                listCount.set(leftListIdx, newCount);
            }

            left++;
        }
    }

    return result;
};