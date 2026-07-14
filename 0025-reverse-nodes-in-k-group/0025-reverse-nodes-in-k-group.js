var reverseKGroup = function(head, k) {
    const tmpList = [];

    let current = head;

    // 연결 리스트의 값을 배열에 저장
    while (current !== null) {
        tmpList.push(current.val);
        current = current.next;
    }

    // k보다 노드 개수가 적으면 원본 반환
    if (tmpList.length < k) {
        return head;
    }

    // k개 단위 그룹 개수
    const loopSeq = Math.floor(tmpList.length / k);

    const emptyList = [];

    // k개 단위로 뒤집기
    for (let seq = 0; seq < loopSeq; seq++) {
        let point = k - 1;

        while (point >= 0) {
            emptyList.push(tmpList[seq * k + point]);
            point--;
        }
    }

    // k개 미만으로 남은 원소 추가
    let checkNum = loopSeq * k;

    while (checkNum < tmpList.length) {
        emptyList.push(tmpList[checkNum]);
        checkNum++;
    }

    // 새로운 연결 리스트 생성
    let finalHead = null;

    for (let i = emptyList.length - 1; i >= 0; i--) {
        finalHead = new ListNode(emptyList[i], finalHead);
    }

    return finalHead;
};