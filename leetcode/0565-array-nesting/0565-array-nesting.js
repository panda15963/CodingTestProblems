function arrayNesting(nums) {
    const arraySize = nums.length;
    const visited = new Array(arraySize).fill(false);
    let maxCycleLength = 0;

    for (let startIndex = 0; startIndex < arraySize; startIndex++) {
        if (visited[startIndex]) {
            continue;
        }

        let currentIndex = nums[startIndex];
        let currentCycleLength = 1;
        visited[currentIndex] = true;

        while (nums[currentIndex] !== nums[startIndex]) {
            currentIndex = nums[currentIndex];
            currentCycleLength++;
            visited[currentIndex] = true;
        }

        maxCycleLength = Math.max(maxCycleLength, currentCycleLength);
    }

    return maxCycleLength;
}