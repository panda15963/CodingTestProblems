var isSameTree = function(treeOne, treeTwo) {
    // 두 노드가 모두 null이면 동일
    if (!treeOne || !treeTwo) {
        return treeOne === treeTwo;
    }

    // 현재 노드 값과 왼쪽, 오른쪽 서브트리 비교
    return treeOne.val === treeTwo.val &&
           isSameTree(treeOne.left, treeTwo.left) &&
           isSameTree(treeOne.right, treeTwo.right);
};

var isSubtree = function(root, subRoot) {
    // 메인 트리가 null이면 서브트리가 존재할 수 없음
    if (!root) {
        return false;
    }

    // 현재 노드부터 동일한 트리인지 확인
    // 아니라면 왼쪽과 오른쪽 서브트리 탐색
    return isSameTree(root, subRoot) ||
           isSubtree(root.left, subRoot) ||
           isSubtree(root.right, subRoot);
};