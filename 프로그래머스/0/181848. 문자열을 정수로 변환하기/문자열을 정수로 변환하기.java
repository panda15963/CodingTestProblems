class Solution {
    public int solution(String n_str) {
        // 방법 1: Integer.parseInt() 사용
        return Integer.parseInt(n_str);
        
        // 방법 2: Integer.valueOf() 사용 (Integer 객체 반환 후 언박싱)
        // return Integer.valueOf(n_str);
    }
}
