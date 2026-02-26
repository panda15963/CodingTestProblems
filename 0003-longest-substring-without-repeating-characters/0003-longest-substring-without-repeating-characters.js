/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const map = new Map();  // {문자: 마지막 인덱스}
    let maxLen = 0;
    let left = 0;  // 왼쪽 포인터
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // 이미 등장한 문자이고 현재 window 안에 있으면
        if (map.has(char) && map.get(char) >= left) {
            left = map.get(char) + 1;  // 왼쪽 포인터 이동
        }
        
        map.set(char, right);  // 최신 인덱스 업데이트
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};
