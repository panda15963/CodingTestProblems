// 직렬화
function serialize(root: TreeNode | null): string {
    if (root === null) {
        return "# #";
    }

    const queue: (TreeNode | null)[] = [root];
    const result: string[] = ["#"];

    let index = 0;

    // BFS
    while (index < queue.length) {
        const node = queue[index++];

        if (node !== null) {
            queue.push(node.left);
            queue.push(node.right);

            result.push(String(node.val));
        } else {
            result.push("#");
        }
    }

    return result.join(" ");
}


// 역직렬화
function deserialize(data: string): TreeNode | null {
    if (data === "# #") {
        return null;
    }

    const nodes: string[] = data.split(" ");

    const root = new TreeNode(Number(nodes[1]));

    const queue: TreeNode[] = [root];

    let queueIndex = 0;
    let index = 2;

    // BFS
    while (queueIndex < queue.length) {
        const node = queue[queueIndex++];

        // 왼쪽 자식
        if (nodes[index] !== "#") {
            node.left = new TreeNode(Number(nodes[index]));
            queue.push(node.left);
        }

        index++;

        // 오른쪽 자식
        if (nodes[index] !== "#") {
            node.right = new TreeNode(Number(nodes[index]));
            queue.push(node.right);
        }

        index++;
    }

    return root;
}