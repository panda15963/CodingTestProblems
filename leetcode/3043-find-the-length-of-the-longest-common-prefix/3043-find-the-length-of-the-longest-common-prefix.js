function longestCommonPrefix(arr1, arr2) {
    const prefixSet = new Set();

    // 1. Insert all prefixes of arr1 numbers into the set
    for (let num of arr1) {
        while (num > 0) {
            prefixSet.add(num);
            num = Math.floor(num / 10);
        }
    }

    let maxLength = 0;

    // 2. Check prefixes of arr2 numbers against the set
    for (let num of arr2) {
        while (num > 0) {
            if (prefixSet.has(num)) {
                const length = String(num).length;
                maxLength = Math.max(maxLength, length);
                break;
            }
            num = Math.floor(num / 10);
        }
    }

    return maxLength;
}