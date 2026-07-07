function solution(arr) {
    let answer = 1;
    let num = 2;

    arr.sort((a, b) => a - b);

    const max = arr[arr.length - 1];

    if (max === 1) return max;

    while (max >= num) {
        let found = false;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % num === 0) {
                arr[i] = arr[i] / num;
                found = true;
            }
        }

        if (found) {
            answer *= num;
        } else {
            num++;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        answer *= arr[i];
    }

    return answer;
}