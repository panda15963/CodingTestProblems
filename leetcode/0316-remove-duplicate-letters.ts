function removeDuplicateLetters(s: string): string {
    const counter: number[] = new Array(26).fill(0);

    for (const c of s) {
        counter[c.charCodeAt(0) - 97]++;
    }

    const stack: string[] = [];
    const visited: boolean[] = new Array(26).fill(false);

    for (const c of s) {
        const index = c.charCodeAt(0) - 97;
        counter[index]--;

        if (visited[index]) {
            continue;
        }

        while (
            stack.length > 0 &&
            c < stack[stack.length - 1] &&
            counter[
                stack[stack.length - 1].charCodeAt(0) - 97
            ] > 0
        ) {
            const top = stack.pop()!;
            visited[top.charCodeAt(0) - 97] = false;
        }

        stack.push(c);
        visited[index] = true;
    }

    return stack.join("");
}