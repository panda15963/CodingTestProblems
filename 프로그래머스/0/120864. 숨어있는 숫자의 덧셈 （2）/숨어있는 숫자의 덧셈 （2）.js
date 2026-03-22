function solution(my_string) {
    return (my_string.match(/\d+/g) || [])
        .reduce((sum, num) => sum + Number(num), 0);
}