/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
    const stack = [];
    let result = 0;

    for (let idx = 0; idx < heights.length; idx++) {
        const height = heights[idx];

        if (stack.length === 0) {
            stack.push([idx, height]);
        } else {
            let width = idx;

            while (
                stack.length > 0 &&
                stack[stack.length - 1][1] > height
            ) {
                const value = stack.pop();
                width = value[0];
                const size = value[1] * (idx - value[0]);
                result = Math.max(result, size);
            }

            stack.push([width, height]);
        }
    }

    while (stack.length > 0) {
        const value = stack.shift();
        const size = value[1] * (heights.length - value[0]);
        result = Math.max(result, size);
    }

    return result;
}