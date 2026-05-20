class Solution {
    public int[] findThePrefixCommonArray(int[] A, int[] B) {
        int n = A.length;
        int[] result = new int[n];
        int[] frequency = new int[n + 1];
        int commonCount = 0;

        for (int i = 0; i < n; i++) {
            // Increment frequency for element in A
            if (++frequency[A[i]] == 2) {
                commonCount++;
            }
            // Increment frequency for element in B
            if (++frequency[B[i]] == 2) {
                commonCount++;
            }
            // Store current prefix count
            result[i] = commonCount;
        }

        return result;
    }
}
