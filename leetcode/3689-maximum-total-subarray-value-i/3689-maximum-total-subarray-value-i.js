function maxTotalValue(nums, k) {
    let mx = Math.max(...nums);
    let mn = Math.min(...nums);

    return (mx - mn) * k;
}