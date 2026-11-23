
var maxDistance = function(arrays) {
    // Initialize the maximum distance result
    let maxDistanceResult = 0;

    // Track the minimum value from all arrays seen so far
    let minValue = arrays[0][0];

    // Track the maximum value from all arrays seen so far
    let maxValue = arrays[0][arrays[0].length - 1];

    // Iterate through remaining arrays
    for (let i = 1; i < arrays.length; i++) {
        const currentArray = arrays[i];

        // Calculate distance between current minimum and previous maximum
        const distanceToMax = Math.abs(currentArray[0] - maxValue);

        // Calculate distance between current maximum and previous minimum
        const distanceToMin = Math.abs(
            currentArray[currentArray.length - 1] - minValue
        );

        // Update maximum distance
        maxDistanceResult = Math.max(
            maxDistanceResult,
            distanceToMax,
            distanceToMin
        );

        // Update global minimum
        minValue = Math.min(minValue, currentArray[0]);

        // Update global maximum
        maxValue = Math.max(
            maxValue,
            currentArray[currentArray.length - 1]
        );
    }

    return maxDistanceResult;
};
