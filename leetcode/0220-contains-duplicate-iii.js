/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(
    nums,
    indexDiff,
    valueDiff
) {
    if (indexDiff <= 0 || valueDiff < 0) {
        return false;
    }

    /*
     * 버킷 크기
     *
     * 같은 버킷에 있는 두 숫자의 차이는
     * 반드시 valueDiff 이하입니다.
     */
    const bucketSize = valueDiff + 1;

    // bucketId → 숫자
    const buckets = new Map();

    // 음수를 올바르게 처리하기 위한 버킷 ID
    const getBucketId = (num) => {
        return Math.floor(num / bucketSize);
    };

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const bucketId = getBucketId(num);

        // 같은 버킷에 이미 숫자가 존재
        if (buckets.has(bucketId)) {
            return true;
        }

        // 이전 버킷 확인
        if (
            buckets.has(bucketId - 1) &&
            Math.abs(num - buckets.get(bucketId - 1)) <= valueDiff
        ) {
            return true;
        }

        // 다음 버킷 확인
        if (
            buckets.has(bucketId + 1) &&
            Math.abs(num - buckets.get(bucketId + 1)) <= valueDiff
        ) {
            return true;
        }

        // 현재 숫자 추가
        buckets.set(bucketId, num);

        /*
         * Sliding Window 유지
         *
         * indexDiff를 초과하는 이전 숫자 제거
         */
        if (i >= indexDiff) {
            const oldNum = nums[i - indexDiff];
            const oldBucketId = getBucketId(oldNum);

            buckets.delete(oldBucketId);
        }
    }

    return false;
};