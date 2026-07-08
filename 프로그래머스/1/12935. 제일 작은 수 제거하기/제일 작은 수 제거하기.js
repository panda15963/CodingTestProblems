function solution(arr) {
    if (arr.length === 1) {
        return [-1];
    }

    let min = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
        }
    }

    const answer = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== min) {
            answer.push(arr[i]);
        }
    }

    return answer;
}