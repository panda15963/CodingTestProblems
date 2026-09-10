/**
 * @param isBadVersion - API to check whether a version is bad
 * @return A function that finds the first bad version
 */
var solution = function(
    isBadVersion: (version: number) => boolean
): (n: number) => number {

    return function(n: number): number {
        let start: number = 1;
        let end: number = n;

        while (start < end) {
            const mid: number =
                start + Math.floor((end - start) / 2);

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