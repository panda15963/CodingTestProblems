function missingMultiple(nums, k) {
    const s = new Set(nums);

    for (let i = 1; ; ++i) {
        const x = k * i;

        if (!s.has(x)) {
            return x;
        }
    }
}