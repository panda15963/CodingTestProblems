class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();

        Map<Character, Character> table = new HashMap<>();
        table.put(')', '(');
        table.put('}', '{');
        table.put(']', '[');

        for (char ch : s.toCharArray()) {
            if (!table.containsKey(ch)) {
                stack.push(ch);
            } else if (stack.isEmpty() || table.get(ch) != stack.pop()) {
                return false;
            }
        }

        return stack.isEmpty();
    }
}