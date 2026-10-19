var circularArrayLoop = function(nums) {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) continue;

        let slow = i;
        let fast = getNextIndex(nums, i);

        while (
            nums[slow] * nums[fast] > 0 &&
            nums[slow] * nums[getNextIndex(nums, fast)] > 0
        ) {
            if (slow === fast) {
                if (slow !== getNextIndex(nums, slow)) {
                    return true;
                }
                break;
            }

            slow = getNextIndex(nums, slow);
            fast = getNextIndex(nums, getNextIndex(nums, fast));
        }

        let currentIndex = i;

        while (
            nums[currentIndex] *
            nums[getNextIndex(nums, currentIndex)] > 0
        ) {
            const nextIndex = getNextIndex(nums, currentIndex);
            nums[currentIndex] = 0;
            currentIndex = nextIndex;
        }
    }

    return false;
};

function getNextIndex(nums, currentIndex) {
    const n = nums.length;
    return ((currentIndex + nums[currentIndex]) % n + n) % n;
}