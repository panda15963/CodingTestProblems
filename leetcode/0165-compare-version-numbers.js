var compareVersion = function(version1, version2) {
    const arr1 = version1.split(".");
    const arr2 = version2.split(".");

    const length = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < length; i++) {
        const b1 = i >= arr1.length ? 0n : BigInt(arr1[i]);
        const b2 = i >= arr2.length ? 0n : BigInt(arr2[i]);

        if (b1 > b2) {
            return 1;
        } else if (b1 < b2) {
            return -1;
        }
    }

    return 0;
};