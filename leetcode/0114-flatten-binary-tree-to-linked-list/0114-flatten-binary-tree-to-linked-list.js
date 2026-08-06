var flatten = function(root) {
    let curr = root;
    while(curr){
        if(curr.left){
            // 왼쪽 노드들의 가장 오른쪽에 현재node오른쪽 부분을 이어붙여야 하기 때문에 포인터 이동
            let l = curr.left;
            while(l.right) l = l.right;
            
            l.right = curr.right;  // 현재노드의 왼편중에서 가장 오른쪽에다가 현재오른노드를 붙여준다.
            curr.right = curr.left;  // 왼쪽노드를 오른쪽으로 이동
            curr.left = null;  // 왼쪽 비우기
        }
        curr = curr.right;  // 계속 오른쪽으로 넘어가면서 탐색. 왼쪽노드가 있을때마다 위의 루프 실행예정
    }
};