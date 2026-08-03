class Solution {
    Boolean[][] memory;

    public boolean isInterleave(String s1, String s2, String s3) {
        if (s3.length() != s1.length() + s2.length()) {//길이가 성립되지 않는다면
            return false;
        }

        //탐색 결과 저장 배열 초기화
        memory = new Boolean[s2.length() + 1][s3.length() + 1];

        return check(s1, s2, s3, 0, 0, 0);
    }

    boolean check(String s1, String s2, String s3, int s1Index, int s2Index, int s3Index) {
        if (s1.length() == s1Index) {//s1 끝에 도달한 경우 s2 나머지와 s3 나머지 비교
            if (s2.substring(s2Index).equals(s3.substring(s3Index))) {
                return true;
            } else {
                return false;
            }
        }

        if (s2.length() == s2Index) {//s2 끝에 도달한 경우 s1 나머지와 s3 나머지 비교
            if (s1.substring(s1Index).equals(s3.substring(s3Index))) {
                return true;
            } else {
                return false;
            }
        }

        if (memory[s2Index][s3Index] != null) {//기존 탐색 값이 존재하는 경우
            return memory[s2Index][s3Index];
        }

        boolean result = false;

        if (s3.charAt(s3Index) == s1.charAt(s1Index)) {//s1 부분과 맞는 경우
            result = check(s1, s2, s3, s1Index + 1, s2Index, s3Index + 1);
        }

        if (s3.charAt(s3Index) == s2.charAt(s2Index)) {//s2 부분과 맞는 경우
            result |= check(s1, s2, s3, s1Index, s2Index + 1, s3Index + 1);
        }

        return memory[s2Index][s3Index] = result;
    }
}