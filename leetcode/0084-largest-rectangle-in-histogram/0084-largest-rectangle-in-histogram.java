class Solution {
    public int largestRectangleArea(int[] heights) {
        Deque<int[]> stack = new ArrayDeque<>();
        int result = 0;

        for (int idx = 0; idx < heights.length; idx++) {
            int height = heights[idx];

            if (stack.isEmpty()) {
                stack.push(new int[]{idx, height});
            } else {
                int width = idx;

                while (!stack.isEmpty() && stack.peek()[1] > height) {
                    int[] value = stack.pop();
                    width = value[0];
                    int size = value[1] * (idx - value[0]);
                    result = Math.max(result, size);
                }

                stack.push(new int[]{width, height});
            }
        }

        while (!stack.isEmpty()) {
            int[] value = stack.removeLast();
            int size = value[1] * (heights.length - value[0]);
            result = Math.max(result, size);
        }

        return result;
    }
}