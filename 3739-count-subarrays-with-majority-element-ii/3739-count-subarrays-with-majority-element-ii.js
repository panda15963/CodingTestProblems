class BinaryIndexedTree {
    constructor(n) {
        this.n = n;
        this.c = new Array(n + 1).fill(0);
    }

    update(x, delta) {
        while (x <= this.n) {
            this.c[x] += delta;
            x += x & -x;
        }
    }

    query(x) {
        let sum = 0;
        while (x > 0) {
            sum += this.c[x];
            x -= x & -x;
        }
        return sum;
    }
}

function countMajoritySubarrays(nums, target) {
    const n = nums.length;
    const tree = new BinaryIndexedTree(2 * n + 1);

    let s = n + 1;
    tree.update(s, 1);

    let ans = 0;

    for (const x of nums) {
        s += (x === target) ? 1 : -1;
        ans += tree.query(s - 1);
        tree.update(s, 1);
    }

    return ans;
}