function solution(users, emoticons) {
    let answer = [0, 0]; // [가입자수, 판매액]
    const discountRates = [10, 20, 30, 40];
    const cases = [];

    // 1. 모든 할인율 조합 생성 (DFS)
    function getDiscountCases(depth, currentRates) {
        if (depth === emoticons.length) {
            cases.push([...currentRates]);
            return;
        }
        for (let rate of discountRates) {
            currentRates.push(rate);
            getDiscountCases(depth + 1, currentRates);
            currentRates.pop();
        }
    }
    getDiscountCases(0, []);

    // 2. 각 경우의 수 시뮬레이션
    for (let rateCase of cases) {
        let currentPlus = 0;
        let currentSales = 0;

        for (let [userRate, userPrice] of users) {
            let userPurchase = 0;
            for (let i = 0; i < emoticons.length; i++) {
                if (rateCase[i] >= userRate) {
                    userPurchase += emoticons[i] * (1 - rateCase[i] / 100);
                }
            }

            if (userPurchase >= userPrice) {
                currentPlus++;
            } else {
                currentSales += userPurchase;
            }
        }

        // 3. 최적 결과 갱신
        if (currentPlus > answer[0]) {
            answer = [currentPlus, currentSales];
        } else if (currentPlus === answer[0] && currentSales > answer[1]) {
            answer[1] = currentSales;
        }
    }

    return answer;
}
