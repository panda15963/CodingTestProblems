var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const map = new Map();

    const n = nums1.length;
    let result = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const sum = nums3[i] + nums4[j];
            map.set(sum, (map.get(sum) || 0) + 1);
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const sum = nums1[i] + nums2[j];
            result += map.get(-sum) || 0;
        }
    }

    return result;
};