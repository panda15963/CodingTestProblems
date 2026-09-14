var NumArray = function(nums) {
    this.n = nums.length;
    this.nums = [...nums];
    this.tree = new Array(this.n + 1).fill(0);

    for (let i = 0; i < this.n; i++) {
        this.updateBIT(i + 1, nums[i]);
    }
};

NumArray.prototype.updateBIT = function(index, delta) {
    while (index <= this.n) {
        this.tree[index] += delta;
        index += index & -index;
    }
};

NumArray.prototype.queryBIT = function(index) {
    let sum = 0;

    while (index > 0) {
        sum += this.tree[index];
        index -= index & -index;
    }

    return sum;
};

NumArray.prototype.update = function(index, val) {
    const delta = val - this.nums[index];

    this.nums[index] = val;
    this.updateBIT(index + 1, delta);
};

NumArray.prototype.sumRange = function(left, right) {
    return this.queryBIT(right + 1) - this.queryBIT(left);
};