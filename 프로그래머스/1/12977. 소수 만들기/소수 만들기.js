function solution(nums) {
    let answer = 0;

    nums.sort((a, b) => a - b);

    const max =
        nums[nums.length - 1] +
        nums[nums.length - 2] +
        nums[nums.length - 3];

    // 에라토스테네스의 체
    const isPrime = new Array(max + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (let i = 2; i * i <= max; i++) {
        if (!isPrime[i]) continue;

        for (let j = i * i; j <= max; j += i) {
            isPrime[j] = false;
        }
    }

    // 서로 다른 3개의 수를 선택
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (isPrime[nums[i] + nums[j] + nums[k]]) {
                    answer++;
                }
            }
        }
    }

    return answer;
}