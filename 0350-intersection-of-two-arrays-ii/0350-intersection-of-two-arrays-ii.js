var intersect = function(nums1, nums2) {
    // nums1의 각 숫자 등장 횟수 저장
    const frequencyMap = {};

    for (const num of nums1) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }

    // 교집합 결과
    const result = [];

    // nums2를 순회하면서 중복 횟수 확인
    for (const num of nums2) {
        if (frequencyMap[num] > 0) {
            result.push(num);
            frequencyMap[num]--;
        }
    }

    return result;
};