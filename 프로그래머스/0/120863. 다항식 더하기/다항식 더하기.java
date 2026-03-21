class Solution {
    public String solution(String polynomial) {
        String[] terms = polynomial.split(" \\+ ");
        int xCoeff = 0;   // x 항 계수
        int constant = 0; // 상수항

        for (String t : terms) {
            if (t.contains("x")) {
                String coeffStr = t.replace("x", "");
                int coeff = coeffStr.isEmpty() ? 1 : Integer.parseInt(coeffStr);
                xCoeff += coeff;
            } else {
                constant += Integer.parseInt(t);
            }
        }

        StringBuilder sb = new StringBuilder();

        if (xCoeff != 0) {
            if (xCoeff == 1) {
                sb.append("x");
            } else {
                sb.append(xCoeff).append("x");
            }
        }

        if (constant != 0) {
            if (sb.length() > 0) sb.append(" + ");
            sb.append(constant);
        }

        return sb.length() == 0 ? "0" : sb.toString();
    }
}