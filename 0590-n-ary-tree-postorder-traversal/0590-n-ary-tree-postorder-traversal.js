/**
 * @param {Node|null} root
 * @return {number[]}
 */
var postorder = function(root) {
    if (root === null) {
        return [];
    }

    const stack = [];
    const ans = [];

    stack.push(root);

    while (stack.length > 0) {
        const curr = stack.pop();

        ans.push(curr.val);

        for (const child of curr.children) {
            stack.push(child);
        }
    }

    // 결과 배열 역순으로 변경
    ans.reverse();

    return ans;
};