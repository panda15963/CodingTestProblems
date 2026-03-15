function solution(my_string, letter) {
    return my_string.replaceAll(letter, "");
    // 또는
    // return my_string.replace(new RegExp(letter, 'g'), "");
}
