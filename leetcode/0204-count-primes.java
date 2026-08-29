class Solution {
    public int countPrimes(int n) {
        if (n < 3) {
            return 0;
        }

        if (n <= 3) {
            return 1;
        }

        boolean[] notPrime = new boolean[n];
        int count = 1;
        for (int i = 3; i < n; i += 2) { // [1] 
            if (notPrime[i] == false) {
                count++;
                for (int j = 3; i * j < n; j += 2) { // [2]
                    notPrime[i * j] = true;
                }
            }
        }
        return count;
    }
}