class NumArray {
    private n: number;
    private nums: number[];
    private tree: number[];

    constructor(nums: number[]) {
        this.n = nums.length;
        this.nums = [...nums];
        this.tree = new Array(this.n + 1).fill(0);

        for (let i = 0; i < this.n; i++) {
            this.updateBIT(i + 1, nums[i]);
        }
    }

    private updateBIT(index: number, delta: number): void {
        while (index <= this.n) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }

    private queryBIT(index: number): number {
        let sum = 0;

        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }

        return sum;
    }

    update(index: number, val: number): void {
        const delta = val - this.nums[index];

        this.nums[index] = val;
        this.updateBIT(index + 1, delta);
    }

    sumRange(left: number, right: number): number {
        return this.queryBIT(right + 1) - this.queryBIT(left);
    }
}