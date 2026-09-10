/**
 * @param {function(number): boolean} isBadVersion
 * @return {function(number): number}
 */
var solution = function(isBadVersion) {

    /**
     * @param {number} n
     * @return {number}
     */
    return function(n) {
        let start = 1;
        let end = n;

        while (start < end) {
            const mid = start + Math.floor((end - start) / 2);

            if (isBadVersion(mid)) {
                // mid가 최초의 잘못된 버전일 수도 있음
                end = mid;
            } else {
                // 잘못된 버전은 mid 이후에 있음
                start = mid + 1;
            }
        }

        return start;
    };
};