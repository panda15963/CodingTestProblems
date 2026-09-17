var maxNumber = function(nums1, nums2, k) {
    const firstArrayLength = nums1.length;
    const secondArrayLength = nums2.length;

    const minDigitsFromFirst = Math.max(0, k - secondArrayLength);
    const maxDigitsFromFirst = Math.min(k, firstArrayLength);

    let result = new Array(k).fill(0);

    for (
        let digitsFromFirst = minDigitsFromFirst;
        digitsFromFirst <= maxDigitsFromFirst;
        ++digitsFromFirst
    ) {
        const subsequence1 = f(nums1, digitsFromFirst);
        const subsequence2 = f(nums2, k - digitsFromFirst);

        const mergedArray = merge(subsequence1, subsequence2);

        if (compare(mergedArray, result, 0, 0)) {
            result = mergedArray;
        }
    }

    return result;
};

function f(nums, k) {
    const arrayLength = nums.length;

    const stack = new Array(k).fill(0);
    let stackTop = -1;
    let remainingToDrop = arrayLength - k;

    for (const currentNum of nums) {
        while (
            stackTop >= 0 &&
            stack[stackTop] < currentNum &&
            remainingToDrop > 0
        ) {
            --stackTop;
            --remainingToDrop;
        }

        if (stackTop + 1 < k) {
            stack[++stackTop] = currentNum;
        } else {
            --remainingToDrop;
        }
    }

    return stack;
}

function compare(nums1, nums2, i, j) {
    if (i >= nums1.length) {
        return false;
    }

    if (j >= nums2.length) {
        return true;
    }

    if (nums1[i] > nums2[j]) {
        return true;
    }

    if (nums1[i] < nums2[j]) {
        return false;
    }

    return compare(nums1, nums2, i + 1, j + 1);
}

function merge(nums1, nums2) {
    const firstLength = nums1.length;
    const secondLength = nums2.length;

    const mergedResult = new Array(firstLength + secondLength).fill(0);

    let firstIndex = 0;
    let secondIndex = 0;

    for (
        let mergedIndex = 0;
        mergedIndex < firstLength + secondLength;
        ++mergedIndex
    ) {
        if (compare(nums1, nums2, firstIndex, secondIndex)) {
            mergedResult[mergedIndex] = nums1[firstIndex++];
        } else {
            mergedResult[mergedIndex] = nums2[secondIndex++];
        }
    }

    return mergedResult;
}