import java.util.*;

class Solution {
    public int solution(int a, int b, int c) {
        int sum1 = a + b + c;
        int sum2 = a*a + b*b + c*c;
        int sum3 = a*a*a + b*b*b + c*c*c;
        
        Set<Integer> set = new HashSet<>();
        set.add(a); set.add(b); set.add(c);
        
        int unique = set.size();
        if (unique == 3) return sum1;
        if (unique == 2) return sum1 * sum2;
        return sum1 * sum2 * sum3;
    }
}
