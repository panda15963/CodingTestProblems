function solution(num_list) {
    let odd = '', even = '';
    
    for (let num of num_list) {
        if (num % 2) odd += num;
        else even += num;
    }
    
    return parseInt(odd) + parseInt(even);
}
