class Solution {
    private nums: number[];

    constructor(nums: number[]) {
        this.nums = nums;
    }

    pick(target: number): number {
        const indices: number[] = [];

        for (let i = 0; i < this.nums.length; i++) {
            if (this.nums[i] === target) {
                indices.push(i);
            }
        }

        const randomIndex: number = Math.floor(
            Math.random() * indices.length
        );

        return indices[randomIndex];
    }
}