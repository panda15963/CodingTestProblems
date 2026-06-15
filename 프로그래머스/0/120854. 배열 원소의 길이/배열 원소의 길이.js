function solution(strlist) {
    const answer = [];

    for (let i = 0; i < strlist.length; i++) {
        answer.push(strlist[i].length);
    }

    return answer;
}