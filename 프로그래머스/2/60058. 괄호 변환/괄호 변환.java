class Solution {

    public String solution(String p) {
        return makeRightString(p);
    }

    private String makeRightString(String w) {

        int parenthesis = 0;
        String u = "";
        String v = "";

        if (w.isEmpty()) {
            return "";
        }

        // 균형잡힌 괄호 문자열 u, v 분리
        int length = 0;

        for (int i = 0; i < w.length(); i++) {
            char c = w.charAt(i);

            if (c == '(') {
                parenthesis++;
            } else {
                parenthesis--;
            }

            length++;

            if (parenthesis == 0) {
                u = w.substring(0, length);

                if (length < w.length()) {
                    v = w.substring(length);
                }

                break;
            }
        }

        // 올바른 괄호 문자열인지 확인
        boolean isRightString = true;
        parenthesis = 0;

        for (int i = 0; i < u.length(); i++) {
            char c = u.charAt(i);

            if (c == '(') {
                parenthesis++;
            } else {
                parenthesis--;
            }

            if (parenthesis < 0) {
                isRightString = false;
                break;
            }
        }

        // 올바른 문자열
        if (isRightString) {
            return u + makeRightString(v);
        }

        // 올바르지 않은 문자열
        StringBuilder sb = new StringBuilder();

        sb.append("(");
        sb.append(makeRightString(v));
        sb.append(")");

        u = u.substring(1, u.length() - 1);

        for (int i = 0; i < u.length(); i++) {
            char c = u.charAt(i);

            if (c == '(') {
                sb.append(')');
            } else {
                sb.append('(');
            }
        }

        return sb.toString();
    }
}