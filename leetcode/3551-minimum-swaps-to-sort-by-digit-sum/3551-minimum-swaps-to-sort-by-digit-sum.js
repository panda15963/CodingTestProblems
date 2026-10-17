var minSwaps = function(nums) {
    function f(x) {
        let digitSum = 0;

        while (x !== 0) {
            digitSum += x % 10;
            x = Math.floor(x / 10);
        }

        return digitSum;
    }

    const n = nums.length;
    const digitSumValuePairs = new Array(n);

    for (let i = 0; i < n; i++) {
        digitSumValuePairs[i] = [f(nums[i]), nums[i]];
    }

    digitSumValuePairs.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });

    const valueToTargetPosition = new Map();

    for (let i = 0; i < n; i++) {
        valueToTargetPosition.set(digitSumValuePairs[i][1], i);
    }

    const visited = new Array(n).fill(false);
    let cycleCount = 0;

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            cycleCount++;
            let currentPosition = i;

            while (!visited[currentPosition]) {
                visited[currentPosition] = true;
                currentPosition = valueToTargetPosition.get(nums[currentPosition]);
            }
        }
    }

    return n - cycleCount;
};