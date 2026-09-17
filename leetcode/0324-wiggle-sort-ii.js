var wiggleSort = function(nums) {
    const bucket = new Array(5001).fill(0);

    for (const value of nums) {
        bucket[value]++;
    }

    const arrayLength = nums.length;
    let currentIndex = 5000;

    for (let i = 1; i < arrayLength; i += 2) {
        while (bucket[currentIndex] === 0) {
            currentIndex--;
        }

        nums[i] = currentIndex;
        bucket[currentIndex]--;
    }

    for (let i = 0; i < arrayLength; i += 2) {
        while (bucket[currentIndex] === 0) {
            currentIndex--;
        }

        nums[i] = currentIndex;
        bucket[currentIndex]--;
    }
};