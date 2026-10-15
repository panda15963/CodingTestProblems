function serialize(root: TreeNode | null): string {
    if (!root) {
        return "";
    }

    const values: number[] = [];

    const preorder = (node: TreeNode | null): void => {
        if (!node) {
            return;
        }

        values.push(node.val);
        preorder(node.left);
        preorder(node.right);
    };

    preorder(root);

    return values.join(" ");
}

function deserialize(data: string): TreeNode | null {
    if (data.length === 0) {
        return null;
    }

    const values = data.split(" ").map(Number);
    let index = 0;

    const buildTree = (
        min: number,
        max: number
    ): TreeNode | null => {
        if (index >= values.length) {
            return null;
        }

        const val = values[index];

        if (val < min || val > max) {
            return null;
        }

        index++;

        const node = new TreeNode(val);

        node.left = buildTree(min, val);
        node.right = buildTree(val, max);

        return node;
    };

    return buildTree(-Infinity, Infinity);
}