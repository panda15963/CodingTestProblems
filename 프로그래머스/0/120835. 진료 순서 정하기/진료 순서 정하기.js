function solution(emergency) {
    const answer = [];

    for (let i = 0; i < emergency.length; i++) {
        let rank = 1;

        for (let j = 0; j < emergency.length; j++) {
            if (emergency[j] > emergency[i]) rank++;
        }

        answer.push(rank);
    }

    return answer;
}