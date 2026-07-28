/**
 * @param {string} path
 * @return {string}
 */
function simplifyPath(path) {
    const arr = path.split("/");
    const stack = [];

    for (const p of arr) {
        if (p === "" || p === ".") {
            continue;
        } else if (p === "..") {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(p);
        }
    }

    return stack.length === 0 ? "/" : "/" + stack.join("/");
}