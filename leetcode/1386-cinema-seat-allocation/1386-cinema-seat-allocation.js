function maxNumberOfFamilies(n, reservedSeats) {
    // 각 행의 예약 좌석을 bitmask로 저장
    const reservedSeatsByRow = new Map();

    // 예약 좌석을 bitmask로 변환
    for (const [row, seat] of reservedSeats) {
        const currentMask = reservedSeatsByRow.get(row) ?? 0;

        // 좌석 10 -> bit 0
        // 좌석 1  -> bit 9
        const seatBit = 1 << (10 - seat);

        reservedSeatsByRow.set(
            row,
            currentMask | seatBit
        );
    }

    // 예약 좌석이 하나도 없는 행은 4인 가족 2팀 가능
    let totalFamilies =
        (n - reservedSeatsByRow.size) * 2;

    // 4인 가족을 배치할 수 있는 3가지 위치
    // 좌측: 2 ~ 5
    const leftGroupMask = 0b0111100000;

    // 우측: 6 ~ 9
    const rightGroupMask = 0b0000011110;

    // 중앙: 4 ~ 7
    const middleGroupMask = 0b0001111000;

    const familyPositionMasks = [
        leftGroupMask,
        rightGroupMask,
        middleGroupMask
    ];

    // 예약 좌석이 있는 각 행 확인
    for (const [row, reservedMaskValue] of reservedSeatsByRow) {
        let reservedMask = reservedMaskValue;

        // 가족을 배치할 수 있는 위치 확인
        for (const positionMask of familyPositionMasks) {

            // 해당 위치에 예약된 좌석이 없는 경우
            if ((reservedMask & positionMask) === 0) {

                // 해당 좌석을 사용한 것으로 처리
                reservedMask |= positionMask;

                totalFamilies++;
            }
        }
    }

    return totalFamilies;
}