function removeKdigits(num: string, k: number): string {
    if (num.length === k) {
        return "0";
    }

    const stack: string[] = [];

    for (let i = 0; i < num.length; i++) {
        while (
            k > 0 &&
            stack.length > 0 &&
            stack[stack.length - 1] > num[i]
        ) {
            stack.pop();
            k--;
        }

        stack.push(num[i]);
    }

    while (k > 0) {
        stack.pop();
        k--;
    }

    while (
        stack.length > 0 &&
        stack[0] === "0"
    ) {
        stack.shift();
    }

    return stack.length > 0
        ? stack.join("")
        : "0";
}