
var maxLength = function(nums) {
    // Find the maximum element and LCM of all elements
    let maxElement = 0;
    let overallLcm = 1;

    for (const num of nums) {
        maxElement = Math.max(maxElement, num);
        overallLcm = lcm(overallLcm, num);
    }

    // Calculate the maximum possible product
    const maxProduct = overallLcm * maxElement;

    const n = nums.length;
    let maxSubarrayLength = 0;

    // Try all possible subarrays
    for (let i = 0; i < n; i++) {
        let product = 1;
        let gcdValue = 0;
        let lcmValue = 1;

        // Extend the subarray
        for (let j = i; j < n; j++) {
            product *= nums[j];
            gcdValue = gcd(gcdValue, nums[j]);
            lcmValue = lcm(lcmValue, nums[j]);

            // Check product = GCD * LCM
            if (product === gcdValue * lcmValue) {
                maxSubarrayLength = Math.max(
                    maxSubarrayLength,
                    j - i + 1
                );
            }

            // Pruning
            if (product > maxProduct) {
                break;
            }
        }
    }

    return maxSubarrayLength;
};

// Greatest Common Divisor (GCD)
function gcd(a, b) {
    if (a === 0) return b;
    if (b === 0) return a;

    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

// Least Common Multiple (LCM)
function lcm(a, b) {
    if (a === 0 || b === 0) return 0;

    return Math.floor((a * b) / gcd(a, b));
}
