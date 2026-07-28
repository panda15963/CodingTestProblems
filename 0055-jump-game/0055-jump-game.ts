/**
 * @param nums
 * @returns
 */
function canJump(nums: number[]): boolean {
    let maxReach: number = 0;

    for (let i = 0; i < nums.length; i++) {
        // 현재 인덱스에 도달할 수 없는 경우
        if (i > maxReach) {
            return false;
        }

        // 현재 위치를 이용해 도달 가능한 최대 범위를 갱신
        maxReach = Math.max(maxReach, i + nums[i]);
    }

    return true;
}