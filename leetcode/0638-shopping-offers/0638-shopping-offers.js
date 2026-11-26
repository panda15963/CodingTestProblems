var shoppingOffers = function(price, special, needs) {
    // 아이템 하나당 할당할 비트 수
    const BITS_PER_ITEM = 4;
    const itemCount = needs.length;

    // 메모이제이션 캐시
    const memoCache = new Map();

    // 초기 needs를 비트마스크로 인코딩
    let initialState = 0;

    for (let i = 0; i < itemCount; i++) {
        initialState |= needs[i] << (i * BITS_PER_ITEM);
    }

    // 현재 상태에서 최소 비용 계산
    const findMinimumCost = function(currentState) {
        // 이미 계산한 상태인지 확인
        if (memoCache.has(currentState)) {
            return memoCache.get(currentState);
        }

        // 일반 가격으로 구매하는 경우를 기본값으로 설정
        let minimumCost = 0;

        for (let i = 0; i < itemCount; i++) {
            // 비트마스크에서 각 상품의 남은 수량 추출
            const quantity = (currentState >> (i * BITS_PER_ITEM)) & 0xf;

            minimumCost += price[i] * quantity;
        }

        // 각 특별 할인 적용 시도
        for (const offer of special) {
            let nextState = currentState;
            let canApplyOffer = true;

            for (let j = 0; j < itemCount; j++) {
                const currentQuantity =
                    (currentState >> (j * BITS_PER_ITEM)) & 0xf;

                const offerQuantity = offer[j];

                // 필요한 수량보다 할인 상품의 수량이 많으면 적용 불가
                if (currentQuantity < offerQuantity) {
                    canApplyOffer = false;
                    break;
                }

                // 비트마스크에서 해당 상품 수량 차감
                nextState -= offerQuantity << (j * BITS_PER_ITEM);
            }

            // 적용 가능한 할인이라면 최소 비용 갱신
            if (canApplyOffer) {
                const offerPrice = offer[itemCount];

                minimumCost = Math.min(
                    minimumCost,
                    offerPrice + findMinimumCost(nextState)
                );
            }
        }

        // 계산 결과 저장
        memoCache.set(currentState, minimumCost);

        return minimumCost;
    };

    return findMinimumCost(initialState);
};