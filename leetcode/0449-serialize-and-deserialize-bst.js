/**
 * Serializes a BST to a string using preorder traversal.
 *
 * @param {TreeNode | null} root
 * @return {string}
 */
var serialize = function(root) {
    if (!root) {
        return "";
    }

    const values = [];

    const preorder = (node) => {
        if (!node) {
            return;
        }

        values.push(node.val);
        preorder(node.left);
        preorder(node.right);
    };

    preorder(root);

    return values.join(" ");
};

/**
 * Deserializes the string back into a BST.
 *
 * @param {string} data
 * @return {TreeNode | null}
 */
var deserialize = function(data) {
    if (data.length === 0) {
        return null;
    }

    const values = data.split(" ").map(Number);
    let index = 0;

    const buildTree = (min, max) => {
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
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */