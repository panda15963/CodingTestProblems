function solution(nums) {
    const max = nums.length / 2;
    const unique = new Set(nums);
    return unique.size > max ? max : unique.size;
}
