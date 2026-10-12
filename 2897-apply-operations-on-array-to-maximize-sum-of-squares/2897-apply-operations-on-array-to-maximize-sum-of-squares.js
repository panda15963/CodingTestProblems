var maxSum = function(nums, k) {
    const bitCount = Array(31).fill(0);

    for (const num of nums) {
        for (let bitPosition = 0; bitPosition < 31; bitPosition++) {
            if ((num >> bitPosition) & 1) {
                bitCount[bitPosition]++;
            }
        }
    }

    let answer = 0n;
    const MOD = 1000000007n;

    while (k-- > 0) {
        let constructedNumber = 0;

        for (let bitPosition = 0; bitPosition < 31; bitPosition++) {
            if (bitCount[bitPosition] > 0) {
                constructedNumber |= (1 << bitPosition);
                bitCount[bitPosition]--;
            }
        }

        const num = BigInt(constructedNumber);
        answer = (answer + num * num) % MOD;
    }

    return Number(answer);
};