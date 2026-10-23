var totalHammingDistance = function(nums) {
    let totalDistance = 0;

    for (let bitPosition = 0; bitPosition < 32; bitPosition++) {
        let onesCount = 0;

        for (const num of nums) {
            onesCount += (num >> bitPosition) & 1;
        }

        const zerosCount = nums.length - onesCount;
        totalDistance += onesCount * zerosCount;
    }

    return totalDistance;
};