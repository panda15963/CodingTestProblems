function zigzagLevelOrder(root: TreeNode | null): number[][] {
    const answer: number[][] = [];

    const zigzagLevelTraversal = (
        node: TreeNode | null,
        level: number
    ): void => {
        if (node === null) {
            return;
        }

        // 해당 레벨의 배열이 없으면 생성
        if (answer.length === level) {
            answer.push([]);
        }

        zigzagLevelTraversal(node.left, level + 1);

        if (level % 2 === 0) {
            // 짝수 레벨: 뒤에 추가
            answer[level].push(node.val);
        } else {
            // 홀수 레벨: 앞에 추가
            answer[level].unshift(node.val);
        }

        zigzagLevelTraversal(node.right, level + 1);
    };

    zigzagLevelTraversal(root, 0);

    return answer;
}