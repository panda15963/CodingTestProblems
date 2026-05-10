function solution(cards1, cards2, goal) {
    for (const word of goal) {
        // cards1의 맨 앞 단어와 일치하는 경우
        if (cards1[0] === word) {
            cards1.shift();
        } 
        // cards2의 맨 앞 단어와 일치하는 경우
        else if (cards2[0] === word) {
            cards2.shift();
        } 
        // 둘 다 일치하지 않으면 카드 뭉치 조합 불가
        else {
            return "No";
        }
    }
    return "Yes";
}
