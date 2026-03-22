function solution(n) {
    let count = 0;
    let num = 0;

    while (count < n) {
        num++;

        if (num % 3 !== 0 && !num.toString().includes("3")) {
            count++;
        }
    }

    return num;
}