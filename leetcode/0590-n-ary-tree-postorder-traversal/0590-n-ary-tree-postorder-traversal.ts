function postorder(root: Node | null): number[] {
    if (root === null) {
        return [];
    }

    const stack: Node[] = [];
    const ans: number[] = [];

    stack.push(root);

    while (stack.length > 0) {
        const curr: Node = stack.pop()!;

        ans.push(curr.val);

        for (const child of curr.children) {
            stack.push(child);
        }
    }

    // 결과 배열 역순으로 변경
    ans.reverse();

    return ans;
}