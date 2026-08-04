class Solution {
    public TreeNode sortedListToBST(ListNode head) {
        ArrayList<Integer> nums = listToArrayList(head);
        return buildSubTree(nums, 0, nums.size() - 1);
    }

    ArrayList<Integer> listToArrayList(ListNode head) {
        ListNode node = head;

        ArrayList<Integer> convertResult = new ArrayList<>();

        while (node != null) {
            convertResult.add(node.val);
            node = node.next;
        }

        return convertResult;
    }

    TreeNode buildSubTree(ArrayList<Integer> nums, int start, int end) {//해당하는 구간에 대한 서브트리 생성 함수
        if (start > end) {
            return null;
        }

        int now = (start + end) / 2;//남은 구간의 가운데를 현재 서브 트리의 부모 노드로 지정
        TreeNode node = new TreeNode(nums.get(now));//부모 노드 생성

        node.left = buildSubTree(nums, start, now - 1);//부모 노드를 제외한 왼쪽 구간에 대한 하위 서브 트리 생성
        node.right = buildSubTree(nums, now + 1, end);//부모 노드를 제외한 오른쪽 구간에 대한 하위 서브 트리 생성

        return node;//노드 반환
    }
}