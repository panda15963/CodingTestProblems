var isValid = function(s) {
    const stack = [];

    const table = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (const char of s) {
        if (!(char in table)) {
            stack.push(char);
        } else if (
            stack.length === 0 ||
            table[char] !== stack.pop()
        ) {
            return false;
        }
    }

    return stack.length === 0;
};