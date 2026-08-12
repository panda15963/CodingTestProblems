function maxSubarrayLength(nums, k) {
    const frequencyMap = new Map();

    let maxLength = 0;
    let leftPointer = 0;

    for (let rightPointer = 0; rightPointer < nums.length; rightPointer++) {
        const currentElement = nums[rightPointer];

        // 현재 원소의 빈도 증가
        const currentFrequency = frequencyMap.get(currentElement) || 0;
        frequencyMap.set(currentElement, currentFrequency + 1);

        // 현재 원소의 빈도가 k를 초과하면 왼쪽을 이동
        while (frequencyMap.get(currentElement) > k) {
            const leftElement = nums[leftPointer];

            const leftFrequency = frequencyMap.get(leftElement);
            frequencyMap.set(leftElement, leftFrequency - 1);

            leftPointer++;
        }

        // 현재 윈도우의 최대 길이 갱신
        const currentWindowSize = rightPointer - leftPointer + 1;
        maxLength = Math.max(maxLength, currentWindowSize);
    }

    return maxLength;
}