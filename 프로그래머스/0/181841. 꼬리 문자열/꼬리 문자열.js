function solution(str_list, ex) {
    return str_list.filter(s => !s.includes(ex)).join('');
}
