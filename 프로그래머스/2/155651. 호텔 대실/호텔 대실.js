function solution(book_time) {
    // 1. 입실 시간 순으로 정렬
    book_time.sort((a, b) => a[0].localeCompare(b[0]));
    
    const rooms = [];

    book_time.forEach(([start, end]) => {
        // 분 단위 변환 (시작, 종료+10분)
        const startMin = timeToMin(start);
        const endMin = timeToMin(end) + 10;
        
        // 2. 이용 가능한 방 찾기 (가장 빨리 비는 방)
        let roomIdx = rooms.findIndex(roomEnd => roomEnd <= startMin);
        
        if (roomIdx !== -1) {
            // 기존 방 업데이트
            rooms[roomIdx] = endMin;
        } else {
            // 새 방 추가
            rooms.push(endMin);
        }
        // 최적화를 위해 rooms를 매번 정렬할 수도 있으나, 
        // 위 방식이 간결하고 효율적
    });
    
    return rooms.length;
}

function timeToMin(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
}
