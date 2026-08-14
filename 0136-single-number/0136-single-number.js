function singleNumber(nums) {
    const set = new Set();

    for (const x of nums) {
        if (set.has(x)) {
            set.delete(x);
        } else {
            set.add(x);
        }
    }

    for (const x of set) {
        return x;
    }

    return -1;
}