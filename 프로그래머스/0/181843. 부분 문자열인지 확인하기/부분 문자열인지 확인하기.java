class Solution {
    public int solution(String my_string, String target) {
        // contains() 메소드로 target이 포함되어 있는지 확인
        if (my_string.contains(target)) {
            return 1;
        } else {
            return 0;
        }
    }
}
