public class Solution {
    public long solution(long a, long b) {
        // a ⊕ b 계산: 두 수를 문자열로 붙인 뒤 long으로 변환
        long concat = Long.parseLong(a + "" + b);
        
        // 2 * a * b 계산
        long product = 2 * a * b;
        
        // 더 큰 값 반환
        // 같으면 concat (a ⊕ b)를 반환
        if (concat >= product) {
            return concat;
        } else {
            return product;
        }
    }
}
