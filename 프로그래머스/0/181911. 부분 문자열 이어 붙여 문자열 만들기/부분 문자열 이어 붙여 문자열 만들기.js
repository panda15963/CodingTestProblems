function solution(my_strings, parts) {
    let result = '';

    for (let i = 0; i < my_strings.length; i++) {
        const s = parts[i][0];
        const e = parts[i][1];

        result += my_strings[i].substring(s, e + 1);
    }

    return result;
}