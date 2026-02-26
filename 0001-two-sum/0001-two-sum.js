/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();  // {숫자: 인덱스} 저장
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];  // 필요한 나머지 값
        
        // Map에 이미 필요한 값이 있는지 확인
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        // 현재 숫자와 인덱스를 Map에 저장
        map.set(nums[i], i);
    }
    
    return [];  // 문제 조건상 여기 도달하지 않음
};
