function majorityElement(nums) {
    const map = new Map();

    // 각 숫자의 등장 횟수 계산
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    const result = [];

    // 전체 길이의 1/3보다 많이 등장한 숫자 찾기
    for (const [num, count] of map) {
        if (count > Math.floor(nums.length / 3)) {
            result.push(num);
        }
    }

    return result;
}