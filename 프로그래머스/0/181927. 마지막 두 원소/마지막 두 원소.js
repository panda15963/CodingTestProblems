function solution(num_list) {
    const answer = [...num_list];
    const last = num_list[num_list.length - 1];
    const prev = num_list[num_list.length - 2];
    answer.push(last > prev ? last - prev : last * 2);
    return answer;
}
