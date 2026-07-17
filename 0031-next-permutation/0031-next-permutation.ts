function nextPermutation(nums: number[]): void {
    const len: number = nums.length;

    if (len <= 1) {
        return;
    }

    // 1. 뒤에서부터 처음으로 감소하는 원소 찾기
    let i: number = len - 2;

    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // 2. 감소하는 원소가 존재하면
    if (i >= 0) {
        let j: number = len - 1;

        // 뒤에서부터 nums[i]보다 큰 첫 번째 원소 찾기
        while (nums[j] <= nums[i]) {
            j--;
        }

        // 3. 두 원소 교환
        swap(nums, i, j);
    }

    // 4. i 이후 구간 뒤집기
    reverse(nums, i + 1, len - 1);
}

function swap(nums: number[], i: number, j: number): void {
    const temp: number = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

function reverse(nums: number[], left: number, right: number): void {
    while (left < right) {
        swap(nums, left++, right--);
    }
}