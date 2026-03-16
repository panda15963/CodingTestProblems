var maxArea = function(height) {

    let left = 0
    let right = height.length - 1

    let max = 0

    while (left < right) {

        const h = Math.min(height[left], height[right])
        const width = right - left

        max = Math.max(max, h * width)

        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }

    return max
};