function minElement(nums) {
    let minimumDigitSum = 100;

    for (const currentNumber of nums) {
        let digitSum = 0;
        let tempNumber = currentNumber;

        while (tempNumber > 0) {
            digitSum += tempNumber % 10;
            tempNumber = Math.floor(tempNumber / 10);
        }

        minimumDigitSum = Math.min(minimumDigitSum, digitSum);
    }

    return minimumDigitSum;
}