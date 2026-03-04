function solution(my_string, queries) {
    let str = my_string;
    for (let [s, e] of queries) {
        str = str.slice(0, s) + str.slice(s, e + 1).split('').reverse().join('') + str.slice(e + 1);
    }
    return str;
}
