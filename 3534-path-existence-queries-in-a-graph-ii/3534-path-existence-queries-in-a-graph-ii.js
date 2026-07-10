/**
 * @param {number} n
 * @param {number[]} nums
 * @param {number} maxDiff
 * @param {number[][]} queries
 * @return {number[]}
 */
// 함수 이름을 pathExistenceQueries로 변경했습니다.
var pathExistenceQueries = function(n, nums, maxDiff, queries) {
    const indexedNums = Array.from({ length: n }, (_, i) => ({ val: nums[i], origIdx: i }));
    indexedNums.sort((a, b) => a.val - b.val);

    const sortedPos = new Array(n);
    for (let i = 0; i < n; i++) {
        sortedPos[indexedNums[i].origIdx] = i;
    }

    const LOG = 18;
    const st = Array.from({ length: n }, () => new Array(LOG).fill(0));
    
    let r = 0;
    for (let i = 0; i < n; i++) {
        r = Math.max(r, i);
        while (r + 1 < n && indexedNums[r + 1].val - indexedNums[i].val <= maxDiff) {
            r++;
        }
        st[i][0] = r; // 버그 수정: 1차원 배열이 아닌 2차원 배열의 첫 번째 칸([0])에 저장해야 합니다.
    }

    for (let j = 1; j < LOG; j++) {
        for (let i = 0; i < n; i++) {
            st[i][j] = st[st[i][j - 1]][j - 1];
        }
    }

    const result = [];
    for (const [u, v] of queries) {
        let a = sortedPos[u];
        let b = sortedPos[v];
        
        if (a === b) {
            result.push(0);
            continue;
        }
        
        if (a > b) {
            let temp = a;
            a = b;
            b = temp;
        }

        let curr = a;
        let steps = 0;

        for (let j = LOG - 1; j >= 0; j--) {
            if (st[curr][j] < b) {
                curr = st[curr][j];
                steps += (1 << j);
            }
        }

        if (st[curr][0] >= b) {
            result.push(steps + 1);
        } else {
            result.push(-1);
        }
    }

    return result;
};
