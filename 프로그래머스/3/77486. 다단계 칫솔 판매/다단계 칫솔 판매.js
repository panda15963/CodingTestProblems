function solution(enroll, referral, seller, amount) {
    const refMap = new Map();
    const amountMap = new Map();

    // 추천인 정보 저장
    for (let i = 0; i < enroll.length; i++) {
        refMap.set(enroll[i], referral[i]);
    }

    // 판매 처리
    for (let i = 0; i < seller.length; i++) {
        let giver = seller[i];
        let getter = refMap.get(giver);

        let profit = amount[i] * 100;

        while (getter !== "-" && profit !== 0) {
            amountMap.set(
                giver,
                (amountMap.get(giver) || 0) + (profit - Math.floor(profit / 10))
            );

            profit = Math.floor(profit / 10);
            giver = getter;
            getter = refMap.get(giver);
        }

        amountMap.set(
            giver,
            (amountMap.get(giver) || 0) + (profit - Math.floor(profit / 10))
        );
    }

    return enroll.map(name => amountMap.get(name) || 0);
}