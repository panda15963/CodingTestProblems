function findMaxLength(nums: number[]): number {
    const map: Map<number, number> = new Map();

    let count: number = 0;
    let answer: number = 0;

    map.set(0, -1);

    for (let i = 0; i < nums.length; i++) {
        count += nums[i] === 1 ? 1 : -1;

        if (map.has(count)) {
            answer = Math.max(answer, i - map.get(count)!);
        } else {
            map.set(count, i);
        }
    }

    return answer;
}