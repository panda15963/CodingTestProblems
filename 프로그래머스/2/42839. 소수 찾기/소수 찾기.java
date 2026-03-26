import java.util.*;

class Solution {
    private boolean[] visited;
    private Set<Integer> numbersSet;
    
    public int solution(String numbers) {
        visited = new boolean[numbers.length()];
        numbersSet = new HashSet<>();
        permutation(numbers.toCharArray(), "", numbers.length());
        
        int count = 0;
        for (int num : numbersSet) {
            if (isPrime(num)) {
                count++;
            }
        }
        return count;
    }
    
    private void permutation(char[] arr, String current, int len) {
        if (!current.isEmpty()) {
            numbersSet.add(Integer.parseInt(current));  // 정수로 중복 제거
        }
        for (int i = 0; i < len; i++) {
            if (!visited[i]) {
                visited[i] = true;
                permutation(arr, current + arr[i], len);
                visited[i] = false;
            }
        }
    }
    
    private boolean isPrime(int n) {
        if (n < 2) return false;
        if (n == 2 || n == 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
}
