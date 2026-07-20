function jump(nums: number[]): number {
    let maxIndex: number = 0;
    let currentEnd: number = 0;
    let answer: number = 0;

    for (let i = 0; i < nums.length; i++) {
        maxIndex = Math.max(maxIndex, i + nums[i]);

        if (currentEnd === i && i !== nums.length - 1) {
            answer++;
            currentEnd = maxIndex;
        }
    }

    return answer;
}