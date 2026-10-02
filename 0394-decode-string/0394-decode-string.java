class Solution {
    public String decodeString(String s) {
        Stack<Integer> numStack = new Stack<>();
        Stack<String> stringStack = new Stack<>();

        String strCur = "";
        String numCur = "";

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);

            if ('0' <= ch && ch <= '9') {
                numCur += ch;
            } else if ('a' <= ch && ch <= 'z') {
                strCur += ch;
            } else if (ch == '[') {
                stringStack.push(strCur);
                numStack.push(Integer.parseInt(numCur));

                numCur = "";
                strCur = "";
            } else {
                strCur =
                    stringStack.pop() +
                    strCur.repeat(numStack.pop());
            }
        }

        return strCur;
    }
}